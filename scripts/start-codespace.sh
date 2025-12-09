#!/bin/bash
set -e

echo "🚀 Starting Apire AI Security Platform in Codespaces..."
echo "This will start: Prompt Shield, Compliance Checker, and RedTeam Kit."
echo "Please wait while containers are built and started..."

docker-compose -f docker-compose.codespaces.yml up --build -d

echo "✅ All services started!"
echo ""
echo "🌍 Access your applications:"
echo "   - Prompt Shield Web:   http://localhost:3002"
echo "   - Prompt Shield API:   http://localhost:3001"
echo "   - Compliance Web:      http://localhost:3004"
echo "   - Compliance API:      http://localhost:3003"
echo "   - RedTeam Web:         http://localhost:3006"
echo "   - RedTeam API:         http://localhost:3005"
echo ""
echo "To stop services, run: docker-compose -f docker-compose.codespaces.yml down"
