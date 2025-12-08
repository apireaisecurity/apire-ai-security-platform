#!/bin/bash
set -e

echo "Building Backend..."
cd backend
npm install
npm run build
cd ..

echo "Building Frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Build Complete!"
