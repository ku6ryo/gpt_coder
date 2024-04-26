import path from "path";
import fs from "fs";
import { isText } from "istextorbinary";
import { PROJECT_CONFIG_FILE } from "./constants";

export function getTargetFiles(rootDir: string, excludes: string[]) {
    const files = [] as string[];
    const walk = (directory: string) => {
        const entries = fs.readdirSync(directory, { withFileTypes: true });
        for (const entry of entries) {
            const entryPath = path.join(directory, entry.name);
            if (entry.isDirectory()) {
                walk(entryPath);
            } else if (entry.name !== PROJECT_CONFIG_FILE && isText(entryPath) && !excludes.some(excludePattern => entryPath.match(excludePattern))) {
                files.push(entryPath);
            }
        }
    };
    walk(rootDir);
    return files
}