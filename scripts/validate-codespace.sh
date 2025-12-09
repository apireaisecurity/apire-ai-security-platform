#!/bin/bash
# This script validates that the Codespace environment is properly configured

echo "🔍 Validating Codespace Configuration..."
echo ""

# Check if we're in a Codespace
if [ -n "$CODESPACE_NAME" ]; then
    echo "✅ Running in GitHub Codespaces"
    echo "   Codespace: $CODESPACE_NAME"
else
    echo "⚠️  Not running in a Codespace (this is fine for local dev)"
fi

# Check Docker
echo ""
echo "🐳 Checking Docker..."
if command -v docker &> /dev/null; then
    echo "✅ Docker is installed"
    docker --version
    
    if docker ps &> /dev/null; then
        echo "✅ Docker daemon is running"
        echo "   Running containers: $(docker ps -q | wc -l)"
    else
        echo "❌ Docker daemon is not accessible"
        echo "   Try: sudo service docker start"
    fi
else
    echo "❌ Docker is not installed"
fi

# Check Docker Compose
echo ""
echo "📦 Checking Docker Compose..."
if command -v docker-compose &> /dev/null; then
    echo "✅ Docker Compose is installed"
    docker-compose --version
else
    echo "❌ Docker Compose is not installed"
fi

# Check Node.js
echo ""
echo "📗 Checking Node.js..."
if command -v node &> /dev/null; then
    echo "✅ Node.js is installed"
    node --version
else
    echo "❌ Node.js is not installed"
fi

# Check npm
if command -v npm &> /dev/null; then
    echo "✅ npm is installed"
    npm --version
else
    echo "❌ npm is not installed"
fi

# Check if node_modules exists
echo ""
echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ Root dependencies installed"
else
    echo "⚠️  Root dependencies not installed"
    echo "   Run: npm install --legacy-peer-deps"
fi

# Check key directories
echo ""
echo "📂 Checking project structure..."
DIRS=("backend" "frontend" "apire-prompt-shield" "apire-compliance-checker" "apire-redteam-kit" "scripts" ".devcontainer")
for dir in "${DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir/"
    else
        echo "❌ $dir/ missing"
    fi
done

# Check if docker-compose.codespaces.yml exists
echo ""
echo "🔧 Checking configuration files..."
FILES=("docker-compose.codespaces.yml" ".devcontainer/devcontainer.json" "scripts/start-codespace.sh" "scripts/setup-codespace.sh")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file missing"
    fi
done

# Check if scripts are executable
echo ""
echo "🔐 Checking script permissions..."
SCRIPTS=("scripts/start-codespace.sh" "scripts/setup-codespace.sh" "scripts/build.sh" "scripts/test-all.sh")
for script in "${SCRIPTS[@]}"; do
    if [ -x "$script" ]; then
        echo "✅ $script (executable)"
    else
        echo "⚠️  $script (not executable)"
        echo "   Run: chmod +x $script"
    fi
done

echo ""
echo "================================="
echo "🎉 Validation Complete!"
echo "================================="
echo ""
echo "To start the platform, run:"
echo "   ./scripts/start-codespace.sh"
