#!/bin/bash
set -e

echo "🚀 Starting Codespace Setup..."

# 1. Install Root Dependencies
echo "📦 Installing dependencies..."
npm install

# 2. Build All Workspaces
echo "🏗️  Building all workspaces..."
./scripts/build.sh

echo "✅ Setup Complete! Your environment is ready."
