const envProxy = new Proxy(import.meta.env, {
    get: (target, prop) => {
        if (typeof prop === 'string') {
            // Log or modify access here if necessary
            return target[prop];
        }
        // Handle symbols (return undefined or a default behavior for non-string props)
        return undefined;
    },
});

export const getEnvVar = (key: string): string => {
    const value = envProxy[key];
    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not defined.`);
    }
    return value;
};
