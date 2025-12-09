# Kubernetes Deployment Guide

This directory contains Kubernetes manifests for deploying the Apire AI Security Platform.

## Prerequisites

- Kubernetes cluster (v1.25+)
- `kubectl` installed
- `kustomize` installed

## Directory Structure

```
kubernetes/
├── base/              # Shared resources (Namespaces, ConfigMaps)
├── prompt-shield/     # Prompt Shield manifests
├── redteam-kit/       # RedTeam Kit manifests
└── compliance-checker/ # Compliance Checker manifests
```

## Local Deployment (Minikube / Kind)

1. **Start Cluster**
   ```bash
   minikube start
   # OR
   kind create cluster
   ```

2. **Apply Manifests**
   ```bash
   # Deploy Base Resources
   kubectl apply -k kubernetes/base

   # Deploy Tools
   kubectl apply -k kubernetes/prompt-shield
   kubectl apply -k kubernetes/redteam-kit
   kubectl apply -k kubernetes/compliance-checker
   ```

3. **Verify Deployment**
   ```bash
   kubectl get pods -n apire-security
   ```

## Validation

Run the validation script to check manifests:
```bash
./scripts/validate-k8s.sh
```
