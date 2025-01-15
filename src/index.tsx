import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found in DOM.");
  throw new Error("Root element not found");
}

console.log("Root element found:", rootElement);

const root = ReactDOM.createRoot(rootElement);

console.log("Rendering PostsProvider in index.tsx...");

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Root rendering complete.");
} catch (error) {
  console.error("Error during rendering:", error);
}
