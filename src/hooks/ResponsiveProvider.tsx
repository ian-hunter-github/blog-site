// src/hooks/ResponsiveProvider.tsx
import React, { createContext } from "react";

type ScreenSize = "small" | "medium" | "large" | { minWidth: number; maxWidth?: number };

// eslint-disable-next-line react-refresh/only-export-components
export const ResponsiveContext = createContext<ScreenSize | null>(null);

export const ResponsiveProvider = ({ children, screenSize }: { children: React.ReactNode; screenSize: ScreenSize }) => {
  return <ResponsiveContext.Provider value={screenSize}>{children}</ResponsiveContext.Provider>;
};
