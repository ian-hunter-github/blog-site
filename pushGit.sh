#!/bin/bash

# Abort if no argument is given
if [ $# -eq 0 ]; then
  echo "Please provide a checkin comment"
  exit 1
fi

# Run npm build and abort if it fails
echo "Running npm build..."
if ! npm run build; then
  echo "Build failed. Aborting."
  exit 1
fi

# Proceed with Git operations
git add .
git commit -m "$1"
git push origin main

echo "Changes pushed to GitHub successfully."
