import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px", minHeight: "80vh" }}>{children}</main>
      <Footer />
    </div>
  );
}

// Add this line to resolve the module issue
export {};