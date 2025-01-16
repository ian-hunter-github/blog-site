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
      <div
        style={{
          flex: 1, // Grow to fill available space
          overflowY: "auto", // Enable scrolling for content
          padding: "16px",
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
