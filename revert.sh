#!/bin/bash

# Ensure the script stops on errors
set -e

# Fetch the latest changes from the remote repository
echo "Fetching latest changes from remote..."
git fetch origin

# Reset the current branch to match the remote
echo "Resetting local branch to match remote..."
git reset --hard origin/$(git rev-parse --abbrev-ref HEAD)

# Remove untracked files and directories
echo "Cleaning up untracked files and directories..."
git clean -fdx

# Show the current status
echo "Repository successfully reset to the latest remote state."
git status
