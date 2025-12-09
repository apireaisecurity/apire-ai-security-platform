#!/bin/bash
set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "🔍 Validating Kubernetes Manifests..."

# Check if kustomize is installed
if ! command -v kustomize &> /dev/null; then
    echo "⚠️  kustomize not found. Skipping validation."
    exit 0
fi

# Validate base
echo -n "Checking base... "
kustomize build kubernetes/base > /dev/null && echo -e "${GREEN}OK${NC}" || echo -e "${RED}FAILED${NC}"

# Validate overlays
for tool in prompt-shield redteam-kit compliance-checker; do
    echo -n "Checking $tool... "
    if [ -d "kubernetes/$tool" ]; then
        kustomize build kubernetes/$tool > /dev/null && echo -e "${GREEN}OK${NC}" || echo -e "${RED}FAILED${NC}"
    else
        echo "⚠️  Directory not found"
    fi
done

echo "✅ Validation complete."
