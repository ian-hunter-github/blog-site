import { createTheme } from "@mui/material/styles";

const forestDarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#E5673D", dark: "#B25030", light: "#FF7F50" }, // Customize for forest
    secondary: { main: "#FFD700" },
    text: { primary: "#FFFFFF", secondary: "#B0B0B0" },
    background: { default: "#121212", paper: "#1E1E1E" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

export default forestDarkTheme;

