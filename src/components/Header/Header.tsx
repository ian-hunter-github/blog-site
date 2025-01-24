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
  const { isMedium, isLarge } = useResponsive();

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
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
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
          <img src="/logo.png" alt="Blog Logo" width={150} height={40} />
        </Link>

        {/* Links Section */}
        {(isMedium || isLarge) ? (
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
