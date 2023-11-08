#!/bin/bash

# Step 1: Run npm build
npm run build

# Step 2: Add changes to the staging area
git add .

 # Step 3: Commit the changes
# git commit -m "Automated commit"  # Default commit message

# Step 4: Allow the user to enter a custom commit message
read -p "Enter a custom commit message: " custom_message

# Step 5: Commit with the custom message (if provided)
if [ -n "$custom_message" ]; then
  git commit -am "$custom_message"
fi

# Step 5: Push to the repository
git push
