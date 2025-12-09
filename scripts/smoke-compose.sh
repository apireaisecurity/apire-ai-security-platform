#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🔍 Starting Smoke Tests for Docker Compose Services..."

# Function to check health
check_health() {
    local service_name=$1
    local url=$2
    local max_retries=30
    local wait_seconds=2

    echo -n "Checking $service_name ($url)... "

    for ((i=1; i<=max_retries; i++)); do
        if curl -s -f "$url" > /dev/null; then
            echo -e "${GREEN}OK${NC}"
            return 0
        fi
        sleep $wait_seconds
    done

    echo -e "${RED}FAILED${NC}"
    return 1
}

# Ensure docker-compose is running
if ! docker compose ps | grep "Up" > /dev/null; then
    echo "⚠️  Docker Compose services don't seem to be running."
    echo "   Starting services..."
    ./scripts/start-codespace.sh
fi

# Check Prompt Shield API
check_health "Prompt Shield API" "http://localhost:3001/health"

# Check RedTeam Kit API
check_health "RedTeam Kit API" "http://localhost:3005/health"

# Check Compliance Checker API
check_health "Compliance Checker API" "http://localhost:3003/health"

echo "✅ All smoke tests passed!"
