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

export default function Header({ headerColor = "LemonChiffon" }: { headerColor?: string }) {
  //const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  //const navigate = useNavigate();

  const theme = useTheme();
  const isMediumOrLarger = useMediaQuery(theme.breakpoints.up("md"));

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  //   }
  // };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value.trim());
  // };

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
        backgroundColor: headerColor,
        padding: "0 16px",
        zIndex: 1100,
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
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/logo.png"
            alt="Blog Logo"
            width={150}
            height={40}
            style={{ marginRight: "8px" }}
          />
        </Link>

        {/* Links Section */}
        {isMediumOrLarger ? (
          <Box sx={{ display: "flex", gap: "16px" }}>
            <Link to="/about" style={{ textDecoration: "none" }}>
              <Button color="inherit">About</Button>
            </Link>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <Button color="inherit">Contact</Button>
            </Link>
          </Box>
        ) : (
          // Menu Icon Section (for smaller screens)
          <>
            <IconButton
              edge="end"
              onClick={handleMenu}
              aria-label="menu"
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
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
