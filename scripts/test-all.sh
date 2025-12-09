#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
RUN_E2E=${RUN_E2E:-false}
RUN_COVERAGE=${RUN_COVERAGE:-false}
RUN_LINT=${RUN_LINT:-true}

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Apire AI Security Platform Test Suite  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Lint check
if [ "$RUN_LINT" = true ]; then
  echo -e "${YELLOW}🔍 Running linters...${NC}"
  npm run lint --workspaces
  echo -e "${GREEN}✓ Lint checks passed${NC}"
  echo ""
fi

# Backend tests
echo -e "${YELLOW}🧪 Testing Backend...${NC}"
cd backend

if [ "$RUN_COVERAGE" = true ]; then
  npm test -- --coverage
  echo -e "${GREEN}✓ Backend tests passed with coverage${NC}"
else
  npm test
  echo -e "${GREEN}✓ Backend tests passed${NC}"
fi

cd ..
echo ""

# Frontend tests
echo -e "${YELLOW}🎨 Testing Frontend...${NC}"
cd frontend

if [ "$RUN_COVERAGE" = true ]; then
  npx vitest run --coverage
  echo -e "${GREEN}✓ Frontend tests passed with coverage${NC}"
else
  npx vitest run
  echo -e "${GREEN}✓ Frontend tests passed${NC}"
fi

if [ "$RUN_E2E" = true ]; then
  echo -e "${YELLOW}🎭 Running E2E Tests...${NC}"
  npx playwright test
  echo -e "${GREEN}✓ E2E tests passed${NC}"
fi

cd ..
echo ""

# New Tools Tests
echo -e "${YELLOW}🛡️  Testing APIRE Prompt Shield...${NC}"
cd apire-prompt-shield
npm test
cd ..
echo ""

echo -e "${YELLOW}🔴 Testing APIRE RedTeam Kit...${NC}"
cd apire-redteam-kit
npm test
cd ..
echo ""

echo -e "${YELLOW}📋 Testing APIRE Compliance Checker...${NC}"
cd apire-compliance-checker
npm test
cd ..
echo ""

echo -e "${GREEN}✨ All tests passed successfully! ✨${NC}"
echo ""
echo -e "${BLUE}Summary:${NC}"
echo -e "  • Backend: Unit + Integration tests ✓"
echo -e "  • Frontend: Unit tests ✓"
if [ "$RUN_E2E" = true ]; then
  echo -e "  • E2E: Playwright tests ✓"
fi
if [ "$RUN_COVERAGE" = true ]; then
  echo -e "  • Coverage reports generated ✓"
fi
echo ""
echo -e "${BLUE}Usage:${NC}"
echo -e "  Run with coverage:    ${YELLOW}RUN_COVERAGE=true ./scripts/test-all.sh${NC}"
echo -e "  Run with E2E:         ${YELLOW}RUN_E2E=true ./scripts/test-all.sh${NC}"
echo -e "  Skip lint:            ${YELLOW}RUN_LINT=false ./scripts/test-all.sh${NC}"
echo -e "  All options:          ${YELLOW}RUN_COVERAGE=true RUN_E2E=true ./scripts/test-all.sh${NC}"
