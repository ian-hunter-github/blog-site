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
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useResponsive } from "../../hooks/useResponsive";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  // Use the responsive hook
  const { isMedium, isLarge, isSmall } = useResponsive();

  // Dynamic header height and logo size
  const headerHeight = isSmall ? 80 : isMedium ? 100 : 120; // Adjust header height
  const logoSize = headerHeight * 0.8; // Logo size is 80% of header height

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
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        height: headerHeight, // Dynamic header height
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between", // Separate logo and links
          alignItems: "center", // Center them vertically
          height: "100%", // Match AppBar height
          paddingTop: `${headerHeight * 0.1}px`, // 10% padding top
          paddingBottom: `${headerHeight * 0.1}px`, // 10% padding bottom
          paddingLeft: "1rem", // Add some left padding for spacing
          paddingRight: "1rem", // Add some right padding for spacing
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
            src="/logo-strength-50+.png"
            alt="Blog Logo"
            style={{
              height: logoSize, // Dynamically scale logo height
              width: "auto", // Maintain aspect ratio
            }}
          />
        </Link>

        {/* Links Section */}
        {isMedium || isLarge ? (
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
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      color: theme.palette.secondary.main,
                    },
                    fontSize: "1.25rem",
                  }}
                >
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </Button>
              </Link>
            ))}
          </Box>
        ) : (
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
              {["about", "contact", "editor"].map((path) => (
                <MenuItem key={path} onClick={handleClose}>
                  <Link
                    to={`/${path}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
