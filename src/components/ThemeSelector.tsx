import React from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";

const ThemeSelector: React.FC = () => {
  const { currentTheme, currentMode, setTheme } = useThemeContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Explicitly typed arrays
  const themes = ["forest", "coral", "ocean"] as const; // Mark as a tuple
  const modes: ("light" | "dark")[] = ["light", "dark"];

  return (
    <>
      <Button onClick={handleClick} variant="contained">
        Current: {currentTheme} ({currentMode})
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {themes.map((theme) =>
          modes.map((mode) => (
            <MenuItem
              key={`${theme}-${mode}`}
              onClick={() => setTheme(theme as typeof themes[number], mode)}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)} ({mode})
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default ThemeSelector;
