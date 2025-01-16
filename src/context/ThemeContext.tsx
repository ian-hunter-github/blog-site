import React, { createContext, useContext, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { themes } from "../themes"; // Import your themes

// Define the keys of the themes object
type ThemeName = keyof typeof themes; // "forest" | "coral" | "ocean"
type ThemeMode = "light" | "dark";

// Define the context's type
type ThemeContextType = {
  currentTheme: ThemeName;
  currentMode: ThemeMode;
  setTheme: (theme: ThemeName, mode: ThemeMode) => void;
};

// Default values for the context
const defaultContext: ThemeContextType = {
  currentTheme: "forest",
  currentMode: "light",
  setTheme: () => {},
};

// Create the context
const ThemeContext = createContext<ThemeContextType>(defaultContext);

// Create the provider component
export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("forest");
  const [currentMode, setCurrentMode] = useState<ThemeMode>("light");

  const setTheme = (theme: ThemeName, mode: ThemeMode) => {
    setCurrentTheme(theme);
    setCurrentMode(mode);
    localStorage.setItem("theme", theme);
    localStorage.setItem("mode", mode);
  };

  const selectedTheme = themes[currentTheme][currentMode];

  return (
    <ThemeContext.Provider value={{ currentTheme, currentMode, setTheme }}>
      <ThemeProvider theme={selectedTheme} key={`${currentTheme}-${currentMode}`}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Export a custom hook for easier context usage
export const useThemeContext = () => useContext(ThemeContext);
