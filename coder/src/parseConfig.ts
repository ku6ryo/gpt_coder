

type Config = {
    excludes: string[];
}

export function parseConfig(raw: object): Config {
    const excludes = (() => {
        if ("excludes" in raw) {
            return raw["excludes"] as string[];
        }
        return [];
    })()
    return  { excludes };
}   