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

  const theme = useTheme(); // Access the default theme

  const isMediumOrLarge = useMediaQuery(theme.breakpoints.up("md"));

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
        backgroundColor: theme.palette.primary.main, // High-contrast background
        color: theme.palette.primary.contrastText, // Ensure readable text
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between", // Align logo and links
          alignItems: "center",
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
          />
        </Link>

        {/* Links Section */}
        {isMediumOrLarge ? (
          <Box sx={{ display: "flex", gap: 2 }}>
          {["about", "contact", "editor"].map((path) => (
            <Link
              to={`/${path}`}
              key={path}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="text"
                sx={{
                  color: theme.palette.primary.contrastText, //"inherit", // Inherit color from AppBar
                  "&:hover": {
                    color: theme.palette.secondary.main, // Highlight on hover
                  },
                  fontSize: "1.25rem",
                }}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Button>
            </Link>
          ))}
        </Box> ) : (
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
