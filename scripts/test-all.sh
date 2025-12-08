#!/bin/bash
set -e

echo "Testing Backend..."
cd backend
npm test
cd ..

echo "Testing Frontend..."
cd frontend
npx vitest run
cd ..

echo "All Tests Passed!"
