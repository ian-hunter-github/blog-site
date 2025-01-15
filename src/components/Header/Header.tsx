import React, { useState } from "react";

import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMediumOrLarger = useMediaQuery(theme.breakpoints.up("md"));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: theme.palette.primary.main, // Use primary color for background
        color: theme.palette.primary.contrastText, // Ensure text contrasts with background
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between", // Align logo and links
          alignItems: "center",
          padding: theme.spacing(1, 2), // Adjust padding using theme spacing
        }}
      >
        {/* Logo Section */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/logo.png"
            alt="Blog Logo"
            width={150}
            height={40}
            style={{ marginRight: theme.spacing(2) }} // Add space between logo and links
          />
        </Link>

        {/* Links Section */}
        {isMediumOrLarger ? (
          <Box sx={{ display: "flex", gap: 2, padding: "16px", backgroundColor: "inherit" }}>
            <Link to="/about" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  color: "text.primary", // Use theme's text primary color
                  "&:hover": {
                    color: "text.secondary", // Use theme's primary color on hover
                  },
                  fontSize: "1.25rem"
                }}
              >
                About
              </Button>
            </Link>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  color: "text.primary",
                  "&:hover": {
                    color: "text.secondary",
                  },
                  fontSize: "1.25rem"
                }}
              >
                Contact
              </Button>
            </Link>
            <Link to="/editor" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  color: "text.primary",
                  "&:hover": {
                    color: "text.secondary",
                  },
                  fontSize: "1.25rem"
                }}
              >
                Editor
              </Button>
            </Link>
          </Box>) : (
          // Menu Icon Section (for smaller screens)
          <>
            <IconButton
              edge="end"
              onClick={handleMenu}
              aria-label="menu"
              sx={{
                color: "inherit",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: theme.palette.background.paper, // Use theme background
                  color: theme.palette.text.primary, // Use theme text color
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
                  About
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
                  Contact
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/editor" style={{ textDecoration: "none", color: "inherit" }}>
                  Editor
                </Link>
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
