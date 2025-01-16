import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Footer: React.FC = () => {
  const theme = useTheme(); // Access the current theme

  console.log("Theme Secondary Main:", theme.palette.secondary.main);
  console.log("Theme Text Secondary:", theme.palette.text.secondary);

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: `${theme.palette.secondary.main} !important`, // Dynamic theme color
        color: theme.palette.text.secondary, // Dynamic text color
        textAlign: "center",
        padding: "16px",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} My Blog. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
