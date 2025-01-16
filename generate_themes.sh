#!/bin/bash

# Define base directory and themes
THEME_DIR="src/themes"
THEMES=("coral" "forest" "ocean")
FILES=("light.ts" "dark.ts" "index.ts")

# Define colors for themes with distinct backgrounds for forest and ocean
declare -A COLORS
COLORS=(
  ["coral_light_primary"]="#FF7F50"
  ["coral_light_secondary"]="#FFD700"
  ["coral_light_background"]="#FFF8F3"

  ["coral_dark_primary"]="#E5673D"
  ["coral_dark_secondary"]="#FFC107"
  ["coral_dark_background"]="#2C1A16"

  ["forest_light_primary"]="#4CAF50"
  ["forest_light_secondary"]="#8BC34A"
  ["forest_light_background"]="#F1F8E9" # Light Green Tint

  ["forest_dark_primary"]="#388E3C"
  ["forest_dark_secondary"]="#558B2F"
  ["forest_dark_background"]="#1B5E20" # Dark Forest Green

  ["ocean_light_primary"]="#03A9F4"
  ["ocean_light_secondary"]="#0288D1"
  ["ocean_light_background"]="#D9F2FF" # Light Aqua Tint

  ["ocean_dark_primary"]="#01579B"
  ["ocean_dark_secondary"]="#0277BD"
  ["ocean_dark_background"]="#003366" # Dark Navy Blue
)

# Create themes directory
mkdir -p $THEME_DIR

# Function to create a file with content
create_file_with_content() {
  local file_path=$1
  local content=$2
  echo "$content" > "$file_path"
  echo "Created: $file_path"
}

# Generate theme files
for theme in "${THEMES[@]}"; do
  THEME_DIR_PATH="$THEME_DIR/$theme"
  mkdir -p "$THEME_DIR_PATH"

  # Generate light.ts
  create_file_with_content "$THEME_DIR_PATH/light.ts" "import { createTheme } from \"@mui/material/styles\";

const ${theme}LightTheme = createTheme({
  palette: {
    mode: \"light\",
    primary: { main: \"${COLORS[${theme}_light_primary]}\", dark: \"#E5673D\", light: \"#FFAD85\" },
    secondary: { main: \"${COLORS[${theme}_light_secondary]}\" },
    text: { primary: \"#333333\", secondary: \"#666666\" },
    background: { default: \"${COLORS[${theme}_light_background]}\", paper: \"#FFFFFF\" },
  },
  typography: {
    fontFamily: \"'Roboto', sans-serif\",
  },
});

export default ${theme}LightTheme;
"

  # Generate dark.ts
  create_file_with_content "$THEME_DIR_PATH/dark.ts" "import { createTheme } from \"@mui/material/styles\";

const ${theme}DarkTheme = createTheme({
  palette: {
    mode: \"dark\",
    primary: { main: \"${COLORS[${theme}_dark_primary]}\", dark: \"#B25030\", light: \"#FF7F50\" },
    secondary: { main: \"${COLORS[${theme}_dark_secondary]}\" },
    text: { primary: \"#FFFFFF\", secondary: \"#B0B0B0\" },
    background: { default: \"${COLORS[${theme}_dark_background]}\", paper: \"#1E1E1E\" },
  },
  typography: {
    fontFamily: \"'Roboto', sans-serif\",
  },
});

export default ${theme}DarkTheme;
"

  # Generate index.ts
  create_file_with_content "$THEME_DIR_PATH/index.ts" "import ${theme}LightTheme from \"./light\";
import ${theme}DarkTheme from \"./dark\";

export { ${theme}LightTheme, ${theme}DarkTheme };
"
done

# Create the main themes index file
create_file_with_content "$THEME_DIR/index.ts" "import { forestLightTheme, forestDarkTheme } from \"./forest\";
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

echo "Theme generation completed successfully!"
