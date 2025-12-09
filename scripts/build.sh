#!/bin/bash
set -e

echo "Building Core Platform..."
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

echo "Building APIRE Prompt Shield..."
cd apire-prompt-shield
npm install
npm run build
cd ..

echo "Building APIRE RedTeam Kit..."
cd apire-redteam-kit
npm install
npm run build
cd ..

echo "Building APIRE Compliance Checker..."
cd apire-compliance-checker
npm install
npm run build
cd ..

echo "All Builds Complete!"
