#!/bin/bash

# Base paths
CONTEXT_DIR="context"
COMPONENTS_DIR="components"
HEADER_DIR="$COMPONENTS_DIR/Header"
BASE_THEME_FILE="themes/index.ts"

# Create directories if they don't exist
mkdir -p $CONTEXT_DIR
mkdir -p $COMPONENTS_DIR
mkdir -p $HEADER_DIR

# Function to create a file with content
create_file_with_content() {
  local file_path=$1
  local content=$2
  if [ ! -f "$file_path" ]; then
    echo "$content" > "$file_path"
    echo "Created: $file_path"
  else
    echo "Skipped: $file_path (already exists)"
  fi
}

# Create ThemeContext.tsx
create_file_with_content "$CONTEXT_DIR/ThemeContext.tsx" "import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { themes } from '../themes';

type ThemeContextType = {
  currentTheme: string;
  currentMode: 'light' | 'dark';
  setTheme: (theme: string, mode: 'light' | 'dark') => void;
};

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'forest',
  currentMode: 'light',
  setTheme: () => {},
});

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('theme') || 'forest');
  const [currentMode, setCurrentMode] = useState<'light' | 'dark'>(() => (localStorage.getItem('mode') as 'light' | 'dark') || 'light');

  const setTheme = (theme: string, mode: 'light' | 'dark') => {
    setCurrentTheme(theme);
    setCurrentMode(mode);
    localStorage.setItem('theme', theme);
    localStorage.setItem('mode', mode);
  };

  const selectedTheme = themes[currentTheme][currentMode];

  return (
    <ThemeContext.Provider value={{ currentTheme, currentMode, setTheme }}>
      <ThemeProvider theme={selectedTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
"

# Create ThemeSelector.tsx
create_file_with_content "$COMPONENTS_DIR/ThemeSelector.tsx" "import React from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

const ThemeSelector: React.FC = () => {
  const { currentTheme, currentMode, setTheme } = useThemeContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const themes = ['forest', 'coral', 'ocean'];
  const modes: ('light' | 'dark')[] = ['light', 'dark'];

  return (
    <>
      <Button onClick={handleClick} variant='contained'>
        Current: {currentTheme} ({currentMode})
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {themes.map((theme) =>
          modes.map((mode) => (
            <MenuItem key={\`\${theme}-\${mode}\`} onClick={() => setTheme(theme, mode)}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)} ({mode})
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default ThemeSelector;
"

# Create Header.tsx with ThemeSelector
create_file_with_content "$HEADER_DIR/Header.tsx" "import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import ThemeSelector from '../ThemeSelector';

const Header: React.FC = () => {
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          My Blog
        </Typography>
        <ThemeSelector />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
"

# Add index.tsx instructions
echo "Ensure your index.tsx wraps the application with ThemeProviderWrapper:

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProviderWrapper } from './context/ThemeContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <App />
    </ThemeProviderWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);
"

echo "Theme Selector setup completed!"
