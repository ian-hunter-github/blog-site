#!/bin/bash

# Check if at least one file or folder is specified
if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <file_or_directory1> <file_or_directory2> ... <file_or_directoryN>"
  exit 1
fi

# Define the delimiter
DELIMITER="======="

# Output the delimiter at the start
echo "$DELIMITER"

# Function to process a file
process_file() {
  local file="$1"
  # Check if the file is a text or JSON file
  if file --mime-type "$file" | grep -q -E 'text/|application/json'; then
    echo "$file"
    cat "$file"
    echo "$DELIMITER"
  fi
}

# Function to process a directory recursively
process_directory() {
  local dir="$1"
  find "$dir" -type f | while read -r file; do
    process_file "$file"
  done
}

# Iterate over all arguments
for path in "$@"; do
  if [ -d "$path" ]; then
    # If it's a directory, process recursively
    process_directory "$path"
  elif [ -f "$path" ]; then
    # If it's a file, process the file
    process_file "$path"
  else
    # Handle invalid paths
    echo "$path - File or directory not found"
    echo "$DELIMITER"
  fi
done

# Output the delimiter at the end
echo "$DELIMITER"
