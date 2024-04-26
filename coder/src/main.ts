import { config as dotenv } from 'dotenv';
dotenv();
import { OpenAI } from "openai"
import fs from "fs";
import { parseConfig } from './parseConfig';
import path from 'path';
import readline from 'readline';
import parseArgs from 'minimist';
import { exit } from 'process';
import { isText } from 'istextorbinary'

const args = parseArgs(process.argv.slice(2));

if (args.h || args.help) {
    console.log("Usage: coder [options]");
    console.log("Options:");
    console.log("  -c <config file>  Specify the config file. Default is coder.config.json");
    exit(0);
}

const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  throw new Error("OPENAI_API_KEY is required");
}

const configPath = args.c || "./coder.config.json";
const config = (() => {
    try {
        const configStr = fs.readFileSync(configPath, "utf-8");
        const configRaw = JSON.parse(configStr);
        const config = parseConfig(configRaw);
        return config
    } catch (e) {
        console.error(`Failed to parse config file: ${configPath}`);
        exit(1);
    }
})()

function ask(question: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise<string>(resolve => {
        rl.question(question, input => {
            rl.close()
            resolve(input)
        });
    });
}

;(async () => {
    const request = await ask("Your request: ");
    const rootDir = path.dirname(configPath);
    // get all files in the root directory recursively
    const files = [] as string[];
    const walk = (dir: string) => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isDirectory()) {
                walk(path.join(dir, entry.name));
            } else {
                const file = path.join(dir, entry.name);
                if (file == configPath) {
                    continue;
                }
                if (!isText(file)) {
                    continue;
                }
                // if file is in the config.exclude, skip it
                if (config.excludes.some((pattern) => {
                    return file.match(pattern);
                })) {
                    continue;
                }
                files.push(file);
            }
        }
    };
    walk(rootDir);
    console.log(files)

    let fileContents = "";
    for (const file of files) {
        const content = fs.readFileSync(file);
        const relativePath = path.relative(rootDir, file);
        fileContents += `===== ${relativePath} START =====\n`
        fileContents += content;
        fileContents += `===== ${relativePath} END =====\n`
    }

    const exampleJson = {
        description: "I want to make an API server with express.js. Please add an hellow world API endpoint.",
        files: [
            { 
                path: "src/server.ts",
                operation: "create",
                code: `import express from 'express'`
            }, {
                path: "src/controllers.ts",
                operation: "delete",
                code: "",
            }
        ]
    }


    const openai = new OpenAI({
        apiKey: openaiApiKey,
    });
    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        response_format: { type: "json_object" },
        messages: [
            {
                role: "system",
                content: "You are a professional coder. You must write code for user's request."
                    + "The output format must be the file path and the code that can be applied to the current codebase."
                    + "Please make sure that the application works."
                    + "Please do not ouptput partial code but full code for a file."
                    + "\n"
                    + "Please output files you changed."
                    + "\n"
                    + "The input format is as follows:\n"
                    + "description: About your changes\n"
                    + "instructions: Instructions which you cannot change. e.g. Hardware configurations, Library install.\n"
                    + "files: List of files you changed\n"
                    + "  path: File path\n"
                    + "  operation: create, update or delete\n"
                    + "  code: Code to be added or updated\n"
                    + "\n"
                    + "Example: "
                    + JSON.stringify(exampleJson)
                    + "\n"
                    + "Current code files are as follows:"
                    + fileContents
            },
            {
                role: "user",
                content: request,
            }
        ],
    });
    const output = response.choices[0].message.content;
    console.log("Token used:", response.usage?.total_tokens)
    if (!output) {
        throw new Error("No output");
    }
    const outputJson = JSON.parse(output);
    console.log("Description:", outputJson.description);
    console.log("Instructions:", outputJson.instructions || "No instructions");
    for (const file of outputJson.files) {
        const o = file.operation;
        const p = path.join(rootDir, file.path)
        const c = file.code
        // If the file is out of the root directory, skip it
        // This is to prevent the user from deleting files outside the root directory
        // e.g. the path is ../../etc/passwd
        if (!p.startsWith(rootDir)) {
            console.warn(`AI provided the following path: ${file.path}`)
            console.warn(`This path is out of the root directory: ${rootDir}`)
            console.warn(`Skipping this file`)
            continue;
        }
        if (o == "delete") {
            // delete the file, if it's a directory, delete the directory
            if (fs.existsSync(p)) {
                if (fs.lstatSync(p).isDirectory()) {
                    fs.rmdirSync(p, { recursive: true });
                } else {
                    fs.unlinkSync(p);
                }
            }
        } else {
            const dir = path.dirname(p);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {
                    recursive: true
                });
            }
            fs.writeFileSync(p, c);
        }
    }
})();