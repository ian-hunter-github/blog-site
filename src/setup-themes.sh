#!/bin/bash

# Define base directories
BASE_DIR="themes"
THEMES=("forest" "coral" "ocean")
FILES=("light.ts" "dark.ts" "index.ts")

# Create themes directory if it doesn't exist
mkdir -p $BASE_DIR

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

# Generate theme files
for theme in "${THEMES[@]}"; do
  THEME_DIR="$BASE_DIR/$theme"
  mkdir -p "$THEME_DIR"

  # Create light.ts
  create_file_with_content "$THEME_DIR/light.ts" "import { createTheme } from \"@mui/material/styles\";

const ${theme}LightTheme = createTheme({
  palette: {
    mode: \"light\",
    primary: { main: \"#FF7F50\", dark: \"#E5673D\", light: \"#FFAD85\" }, // Customize for $theme
    secondary: { main: \"#FFD700\" },
    text: { primary: \"#333333\", secondary: \"#666666\" },
    background: { default: \"#F8F8F8\", paper: \"#FFFFFF\" },
  },
  typography: {
    fontFamily: \"'Roboto', sans-serif\",
  },
});

export default ${theme}LightTheme;
"

  # Create dark.ts
  create_file_with_content "$THEME_DIR/dark.ts" "import { createTheme } from \"@mui/material/styles\";

const ${theme}DarkTheme = createTheme({
  palette: {
    mode: \"dark\",
    primary: { main: \"#E5673D\", dark: \"#B25030\", light: \"#FF7F50\" }, // Customize for $theme
    secondary: { main: \"#FFD700\" },
    text: { primary: \"#FFFFFF\", secondary: \"#B0B0B0\" },
    background: { default: \"#121212\", paper: \"#1E1E1E\" },
  },
  typography: {
    fontFamily: \"'Roboto', sans-serif\",
  },
});

export default ${theme}DarkTheme;
"

  # Create index.ts
  create_file_with_content "$THEME_DIR/index.ts" "import ${theme}LightTheme from \"./light\";
import ${theme}DarkTheme from \"./dark\";

export { ${theme}LightTheme, ${theme}DarkTheme };
"
done

# Create the main themes index file
create_file_with_content "$BASE_DIR/index.ts" "import { forestLightTheme, forestDarkTheme } from \"./forest\";
import { coralLightTheme, coralDarkTheme } from \"./coral\";
import { oceanLightTheme, oceanDarkTheme } from \"./ocean\";

export const themes = {
  forest: {
    light: forestLightTheme,
    dark: forestDarkTheme,
  },
  coral: {
    light: coralLightTheme,
    dark: coralDarkTheme,
  },
  ocean: {
    light: oceanLightTheme,
    dark: oceanDarkTheme,
  },
};
"

echo "Theme setup completed!"
