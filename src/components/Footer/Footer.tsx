import React from "react";
import { Paper, Typography, useTheme } from "@mui/material";

const Footer: React.FC = () => {

  const theme = useTheme(); // Access the default MUI theme

  return (
    <Paper
      component="footer"
      square
      elevation={3}
      sx={{
         backgroundColor: theme.palette.primary.main,
         color: theme.palette.primary.contrastText,
         textAlign: "center",
         padding: theme.spacing(2),
       }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} My App. All rights reserved.
      </Typography>
    </Paper>
  );
};

export default Footer;
