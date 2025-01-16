// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Use light mode by default
    primary: {
      main: "#003366", // Deep ocean blue
      light: "#336699", // Lighter blue
      dark: "#001A33", // Darker blue
      contrastText: "#FFFFFF", // White for text contrast
    },
    secondary: {
      main: "#00A0B0", // Ocean teal
      light: "#33B2C2", // Lighter teal
      dark: "#007080", // Darker teal
      contrastText: "#FFFFFF", // White for text contrast
    },
    text: {
      primary: "#002244", // Navy for primary text
      secondary: "#004466", // Dark teal for secondary text
    },
    background: {
      default: "#F0F8FF", // Light blue-gray background
      paper: "#FFFFFF", // White for card and modal backgrounds
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      letterSpacing: "0em",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
    button: {
      textTransform: "none", // Prevent uppercase transformation
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Slightly rounded corners
          padding: "8px 16px", // Add consistent padding
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#003366", // Use primary main color for the header
          color: "#FFFFFF", // White text
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF", // White for paper components
          color: "#002244", // Primary text color
        },
      },
    },
  },
});

export default theme;
