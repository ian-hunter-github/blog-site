import { Box, Typography, useTheme } from "@mui/material";
import './Footer.css';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        marginTop: "auto", // Ensures the footer is pushed to the bottom
        width: "100%", // Full width of the page
        padding: "16px", // Padding for spacing
        borderTop: "1px solid #ddd", // Optional top border for separation
        backgroundColor: theme.palette.primary.main, // Theme-based background color
        height: "128px", // Double the standard height (e.g., 64px * 2)
      }}
    >
      <Typography
        variant="body2"
        sx={{
          textAlign: "center", // Center-align the text
          color: theme.palette.text.secondary, // Use theme text color
        }}
      >
        © {new Date().getFullYear()} My Blog. All rights reserved.
      </Typography>
    </Box>
  );
}
