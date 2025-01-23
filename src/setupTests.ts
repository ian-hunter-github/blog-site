import '@testing-library/jest-dom';

// Extend globalThis.importMeta to satisfy the ImportMeta type
globalThis.importMeta = {
  env: {
    VITE_BACKEND_URL: "http://mock-backend-url.com",
    VITE_FETCH_REMOTE_DATA: "false", // Mocked as string
    BASE_URL: "/",
    MODE: "test",
    DEV: false,
    PROD: false,
    SSR: false,
  },
  url: "http://localhost/",
  resolve: (specifier: string) => specifier, // Mock resolve function
  jest: undefined, // Optional, can remain undefined if not used
  glob: () => ({}), // Mock glob function
} as unknown as ImportMeta; // Use `unknown` to bypass overlap issue

