import { createTheme } from "@mui/material/styles";

const forestLightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#4CAF50", dark: "#388E3C", light: "#C8E6C9" }, // Green hues
    secondary: { main: "#8BC34A" },
    text: { primary: "#2E7D32", secondary: "#558B2F" },
    background: { default: "#F1F8E9", paper: "#FFFFFF" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

export default forestLightTheme;
