import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "sticky", // Makes the footer sticky
        bottom: 0, // Positions it at the bottom of the viewport
        width: "100%", // Ensures it spans the full width of the page
        backgroundColor: "LemonChiffon", // Optional background color
        padding: "16px", // Padding for spacing
        borderTop: "1px solid #ddd", // Optional top border for separation
      }}
    >
      <Typography
        variant="body2"
        sx={{ textAlign: "right", color: "gray" }}
      >
        © {new Date().getFullYear()} My Blog. All rights reserved.
      </Typography>
    </Box>
  );
}
