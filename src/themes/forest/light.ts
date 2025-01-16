import { createTheme } from "@mui/material/styles";

const forestLightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#FF7F50", dark: "#E5673D", light: "#FFAD85" }, // Customize for forest
    secondary: { main: "#FFD700" },
    text: { primary: "#333333", secondary: "#666666" },
    background: { default: "#F8F8F8", paper: "#FFFFFF" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

export default forestLightTheme;

