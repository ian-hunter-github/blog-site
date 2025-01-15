import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Full viewport height
      }}
    >
      <Header />
      <main style={{ flex: 1, padding: "16px" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

// Add this line to resolve the module issue
export { };