#!/bin/bash

# Define the line delimiter
DELIMITER="=========="

# Function to list all files to be processed
list_files() {
  for path in "$@"; do
    if [ -d "$path" ]; then
      # Recurse into directories
      find "$path" -type f | while read -r file; do
        if file "$file" | grep -Eq "text|JSON"; then
          echo "$file"
        fi
      done
    elif [ -f "$path" ]; then
      # Check if the file is a text file
      if file "$path" | grep -Eq "text|JSON"; then
        echo "$path"
      fi
    fi
  done
}

# Check for arguments
if [ $# -eq 0 ]; then
  echo "Error: No arguments provided. Please specify files or folders as arguments."
  exit 1
fi

# Test mode
if [ "$1" == "-t" ] || [ "$1" == "--test" ]; then
  shift
  if [ $# -eq 0 ]; then
    echo "Error: No arguments provided for test mode. Specify files or folders."
    exit 1
  fi
  # Print the list of files to be processed
  list_files "$@"
  exit 0
fi

# Non-test mode: Process files and print delimited contents
list_files "$@" | while read -r file; do
  echo "$DELIMITER"
  echo "Full Path: $file"
  echo
  cat "$file"
done

# Final delimiter
echo "$DELIMITER"
