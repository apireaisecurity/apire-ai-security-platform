#!/bin/bash
set -e

echo "🚀 Initializing Codespace Environment..."

# 1. Install Root Dependencies
echo "📦 Installing NPM dependencies (this may take a minute)..."
# Use legacy-peer-deps to avoid conflicts with Vite versions
npm install --legacy-peer-deps

# 2. Build All Workspaces
# We build them once to ensure all types are generated and common libs are ready
echo "🏗️  Building all workspaces..."
./scripts/build.sh

# 3. Make scripts executable
chmod +x scripts/*.sh

echo "✅ Setup Complete! Your environment is ready."
echo "👉 Run './scripts/start-codespace.sh' to start the platform."
