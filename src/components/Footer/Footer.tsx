import { Box, Typography, useTheme } from "@mui/material";

import './Footer.css';

export default function Footer() {

  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        position: "sticky", // Makes the footer sticky
        bottom: 0, // Positions it at the bottom of the viewport
        width: "100%", // Ensures it spans the full width of the page
        padding: "16px", // Padding for spacing
        borderTop: "1px solid #ddd", // Optional top border for separation
        backgroundColor: theme.palette.primary.main
      }}
    >
      <Typography
        variant="body2"
        sx={{ textAlign: "right", color: "gray", backgroundColor: theme.palette.primary.main }}
      >
        © {new Date().getFullYear()} My Blog. All rights reserved.
      </Typography>
    </Box >
  );
}
