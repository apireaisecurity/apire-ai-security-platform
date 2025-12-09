#!/bin/bash
set -e

# Configuration
WIKI_REPO_URL="https://github.com/apireaisecurity/apire-ai-security-platform.wiki.git"
SOURCE_DIR="./wiki_content"
TEMP_DIR="./temp_wiki_deploy"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Wiki Deployment...${NC}"

# 1. Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}Error: Source directory $SOURCE_DIR does not exist.${NC}"
    exit 1
fi

# 2. Clean up previous temp dir if it exists
if [ -d "$TEMP_DIR" ]; then
    rm -rf "$TEMP_DIR"
fi

# 3. Clone the wiki repository
echo "Cloning wiki repository..."
if ! git clone "$WIKI_REPO_URL" "$TEMP_DIR"; then
    echo -e "${RED}Error: Failed to clone wiki repository.${NC}"
    echo -e "${RED}Make sure you have initialized the Wiki in GitHub by creating the first page manually.${NC}"
    exit 1
fi

# 4. Copy files
echo "Copying documentation files..."
cp -R "$SOURCE_DIR/"* "$TEMP_DIR/"

# 5. Commit and Push
cd "$TEMP_DIR"

# Configure git if needed (uses local config by default)
# git config user.name "Deploy Script"
# git config user.email "deploy@example.com"

if [ -z "$(git status --porcelain)" ]; then
    echo "No changes to commit."
else
    git add .
    git commit -m "Update wiki documentation from apire-ai-security-platform/wiki_content"
    
    echo "Pushing changes to GitHub..."
    git push origin master
    echo -e "${GREEN}Wiki successfully deployed!${NC}"
fi

# 6. Cleanup
cd ..
rm -rf "$TEMP_DIR"

echo -e "${GREEN}Done.${NC}"
