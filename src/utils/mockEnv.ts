const originalEnv: Partial<Record<string, string>> = { ...import.meta.env };

// Mock environment variables
export const mockEnvVars = (mockedEnv: Record<string, string>): void => {
  Object.entries(mockedEnv).forEach(([key, value]) => {
    // Ensure the property is configurable, writable, and enumerable
    Object.defineProperty(import.meta.env, key, {
      value,
      writable: true,
      enumerable: true,
      configurable: true,
    });
  });
};

// Restore environment variables to their original state
export const restoreEnvVars = (): void => {
  Object.keys(import.meta.env).forEach((key) => {
    if (originalEnv[key] !== undefined) {
      // Restore original value
      Object.defineProperty(import.meta.env, key, {
        value: originalEnv[key],
        writable: true,
        enumerable: true,
        configurable: true,
      });
    } else {
      // Delete keys that weren't part of the original environment
      delete import.meta.env[key];
    }
  });
};
