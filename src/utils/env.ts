// src/utils/env.ts
export const getEnv = () => ({
    VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
    VITE_FETCH_REMOTE_DATA: import.meta.env.VITE_FETCH_REMOTE_DATA,
  });
  