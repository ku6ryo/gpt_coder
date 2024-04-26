import path from "path";
import fs from "fs";

type GlobalConfig = {
    openaiApiKey: string
}

export function loadGlobalConfig(): GlobalConfig {
    // Read global config file. the config file is .coderrc in home directory or in the current directory
    const homeConfigPath = path.join(process.env.HOME || "", ".coderrc");
    const currentDirectoryConfigPath = path.join(process.cwd(), ".coderrc");
    const raw = (() => {
        try {
            const configStr = fs.readFileSync(homeConfigPath, "utf-8");
            const configRaw = JSON.parse(configStr);
            return configRaw
        } catch (e) {
            try {
                const configStr = fs.readFileSync(currentDirectoryConfigPath, "utf-8");
                const configRaw = JSON.parse(configStr);
                return configRaw
            } catch (e) {
                throw new Error("Global config file not found")
            }
        }
    })()
    if (!("openaiApiKey" in raw)) {
        throw new Error("Global config file is missing openaiApiKey")
    }
    return {
        openaiApiKey: raw["openaiApiKey"]
    }
}