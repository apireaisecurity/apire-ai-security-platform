#!/bin/bash
set -e

echo "Deploying to Kubernetes..."
kubectl apply -k kubernetes/base

echo "Deployment Applied!"
