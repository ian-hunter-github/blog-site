/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    isolate: true,
    pool: "threads",
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 4,
      },
    },
  },
  server:
    process.env.NODE_ENV === "development"
      ? {
          proxy: {
            "/api": {
              target: "http://localhost:8888",
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path.replace(/^\/api/, "/.netlify/functions"),
            },
          },
        }
      : undefined,
});
