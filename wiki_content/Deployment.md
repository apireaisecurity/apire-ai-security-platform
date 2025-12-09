# Deployment Guide

This guide covers how to deploy the Apire AI Security Platform to production environments.

## Docker Deployment

For single-server deployments, use Docker Compose.

1.  **Build Images**:
    ```bash
    docker-compose build
    ```

2.  **Start Services**:
    ```bash
    docker-compose up -d
    ```

3.  **Environment Variables**:
    Ensure you create a `.env` file based on `.env.example` with secure secrets for production.

## Kubernetes Deployment

For scalable, clustered deployments, use the provided Kubernetes manifests.

### Prerequisites
-   A running Kubernetes cluster (EKS, GKE, AKS, or Minikube).
-   `kubectl` configured.

### Deployment Steps

1.  **Apply Manifests**:
    The repository uses Kustomize to manage configurations.
    ```bash
    kubectl apply -k kubernetes/
    ```

2.  **Verify Pods**:
    ```bash
    kubectl get pods
    ```

3.  **Access Services**:
    By default, services are exposed via `ClusterIP`. For external access, you will need to configure an **Ingress Controller** or change the service type to `LoadBalancer`.

### Resource Requirements

| Service | CPU Request | Memory Request |
| :--- | :--- | :--- |
| Core Backend | 250m | 512Mi |
| Prompt Shield | 250m | 512Mi |
| RedTeam Kit | 500m | 1Gi |
| Compliance Checker | 250m | 512Mi |
| Databases | Varies | Varies |

## CI/CD

The project includes GitHub Actions workflows for:
-   **Testing**: Runs on every PR.
-   **Security**: Runs CodeQL analysis.
-   **Build**: (Planned) Auto-build and push Docker images to a registry.
