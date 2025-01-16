import { createTheme, PaletteColor, PaletteMode, PaletteOptions } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";

// **Typography Configuration**
const typography: TypographyOptions = {
  fontFamily: "'Roboto', sans-serif",
  h1: {
    fontFamily: "'Lato', sans-serif",
    fontWeight: 700,
    fontSize: "2.5rem",
  },
  h2: {
    fontFamily: "'Lato', sans-serif",
    fontWeight: 600,
    fontSize: "2rem",
  },
  button: {
    fontWeight: 600,
    textTransform: "none",
    fontSize: "1rem",
  },
};

const palette: { light: PaletteOptions; dark: PaletteOptions } = {
    light: {
      mode: "light" as PaletteMode,
      primary: {
        main: "#FF7F50",
        dark: "#E5673D",
        light: "#FFAD85",
      },
      secondary: {
        main: "#FFD700",
      },
      text: {
        primary: "#333333", // Dark Gray
        secondary: "#666666", // Subtle Gray
      },
      background: {
        default: "#F8F8F8",
        paper: "#FFFFFF",
      },
    },
    dark: {
      mode: "dark" as PaletteMode,
      primary: {
        main: "#E5673D",
        dark: "#B25030",
        light: "#FF7F50",
      },
      secondary: {
        main: "#FFD700",
      },
      text: {
        primary: "#FFFFFF", // White
        secondary: "#B0B0B0", // Light Gray
      },
      background: {
        default: "#121212",
        paper: "#1E1E1E",
      },
    },
  };
  
// **Components Overrides**
const components = (palette: PaletteOptions) => ({
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--primary-color": (palette.primary as PaletteColor)?.main,
          "--primary-dark": (palette.primary as PaletteColor)?.dark,
          "--secondary-color": (palette.secondary as PaletteColor)?.main,
          "--text-color": palette.text?.primary || "#333333",
          "--background-color": palette.background?.default,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: (palette.text as PaletteColor)?.main, // Use text color for buttons
          "&:hover": {
            color: (palette.secondary as PaletteColor)?.main, // Use primary color on hover
          },
          fontSize: "1.25rem",
          padding: "8px 16px",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: (palette.primary as PaletteColor)?.main, // Default link color
          "&:hover": {
            color: (palette.secondary as PaletteColor)?.dark, // Hover link color
          },
          textDecoration: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: (palette.primary as PaletteColor)?.main, // AppBar background color
          color: palette.text?.primary, // Text color in the AppBar
        },
      },
    },
  });
  
  // **Light and Dark Themes**
  const lightTheme = createTheme({
    palette: palette.light,
    typography,
    components: components(palette.light), // Call the components function here
  });
  

  const darkTheme = createTheme({
    palette: palette.light,
    typography,
    components: components(palette.dark), // Call the components function here
  });
  

// **Export Themes and Configuration**
export { lightTheme, darkTheme, palette, typography };
