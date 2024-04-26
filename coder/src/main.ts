import { config } from 'dotenv';
config();
import { OpenAI } from "openai"
import fs from "fs";
import { parseConfig } from './parseConfig';
import path from 'path';

const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  throw new Error("OPENAI_API_KEY is required");
}

const configPath = process.env.CONFIG_PATH;
if (!configPath) {
  throw new Error("CONFIG_PATH is required");
}

;(async () => {

    const configStr = fs.readFileSync(configPath, "utf-8");
    const configRaw = JSON.parse(configStr);
    const config = parseConfig(configRaw);
    console.log(config)

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
                files.push(file);
            }
        }
    };
    walk(rootDir);
    console.log(files)

    let fileContents = "";
    for (const file of files) {
        const content = fs.readFileSync(file, "utf-8");
        fileContents += `===== ${file} START =====\n`
        fileContents += content;
        fileContents += `===== ${file} END =====\n`
    }


    const openai = new OpenAI({
        apiKey: openaiApiKey,
    });
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: "You are a professional coder. You must write code for user's request."
                    + "The output format must be a patch file that can be applied to the current codebase."
                    + "\n"
                    + "Current code files are as follows:"
                    + fileContents
            },
            {
                role: "user",
                content: "I want to make an API server with express.js. Please add an hellow world API endpoint."
            }
        ],
    });

    console.log(response.choices[0].message.content);
})();