# Docker Guide: APIRE Prompt Shield

This guide covers the container architecture and deployment strategies for APIRE Prompt Shield.

## Container Architecture

The application is composed of 5 main containers:

1.  **`web`**: Nginx serving the React static build.
2.  **`api`**: Node.js Express server.
3.  **`worker`**: Node.js background worker.
4.  **`postgres`**: Database.
5.  **`redis`**: Cache and Queue.

## Multi-Stage Builds

We use multi-stage Docker builds to keep image sizes small and secure.

### Example: API Dockerfile
```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/main.js"]
```

## Docker Compose

### Development (`docker-compose.yml`)
Optimized for hot-reloading and debugging. Mounts source code as volumes.

### Production
For production, use the built images and remove volume mounts for code.

```yaml
version: '3.8'
services:
  api:
    image: apire/prompt-shield-api:latest
    restart: always
    env_file: .env.production
    ports:
      - "4000:4000"
    depends_on:
      - postgres
      - redis
  # ... other services
```

## Kubernetes Deployment

For production scaling, we recommend Kubernetes.

### Manifests
Located in `k8s/`:
- `deployment-api.yaml`: Scalable API deployment.
- `deployment-worker.yaml`: Scalable Worker deployment (HPA supported).
- `service-api.yaml`: Load balancer for API.
- `ingress.yaml`: Ingress controller configuration.

### Scaling Strategy
- **API**: Scale based on CPU/Memory usage.
- **Worker**: Scale based on Queue Length (Custom Metric).

## Monitoring & Logging

- Containers output logs to `stdout`/`stderr`.
- Configure your Docker daemon to ship logs to ELK, Splunk, or CloudWatch.
- Health checks are implemented at `/health` endpoints for all services.

## Backup & Recovery

- **PostgreSQL**: Use a sidecar container or cron job to run `pg_dump` periodically to a mounted volume or S3.
- **Redis**: Enable AOF (Append Only File) persistence for durability.
