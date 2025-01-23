export {}; // Ensure this file is treated as a module

declare global {
  interface ImportMeta {
    env: {
      VITE_BACKEND_URL: string;
      VITE_FETCH_REMOTE_DATA: string;
      [key: string]: string | boolean;
    };
  }

  // Extend globalThis
  namespace globalThis {
    // eslint-disable-next-line no-var
    var importMeta: ImportMeta; // Declare importMeta as a property of globalThis
  }
}
