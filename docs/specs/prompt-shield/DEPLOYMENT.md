# Deployment Guide: APIRE Prompt Shield

## Production Checklist

Before deploying to production, ensure you have:

- [ ] Changed all default passwords (admin, DB).
- [ ] Generated strong secrets for `JWT_SECRET` and `SESSION_SECRET`.
- [ ] Configured SSL/TLS (HTTPS).
- [ ] Set up a persistent database volume.
- [ ] Configured monitoring and alerting.

## Docker Swarm Setup

1.  **Initialize Swarm**: `docker swarm init`
2.  **Deploy Stack**: `docker stack deploy -c docker-compose.prod.yml prompt-shield`

## Kubernetes Deployment

We provide Helm charts (coming soon) and raw manifests.

1.  **Create Namespace**: `kubectl create namespace apire`
2.  **Apply Secrets**:
    ```bash
    kubectl create secret generic apire-secrets \
      --from-literal=jwt-secret=supersecret \
      --from-literal=db-password=securepass
    ```
3.  **Apply Manifests**: `kubectl apply -f k8s/ -n apire`

## Cloud Provider Guides

### AWS (ECS/Fargate)

1.  Push images to ECR.
2.  Create a Task Definition with the 5 containers.
3.  Create an ECS Service behind an Application Load Balancer (ALB).
4.  Use RDS for PostgreSQL and ElastiCache for Redis.

### GCP (Cloud Run)

_Note: Cloud Run is stateless, so you need external DB/Redis._

1.  Deploy API and Worker as separate Cloud Run services.
2.  Use Cloud SQL for PostgreSQL.
3.  Use Memorystore for Redis.

### Azure (AKS)

1.  Use Azure Kubernetes Service.
2.  Use Azure Database for PostgreSQL.
3.  Use Azure Cache for Redis.

## SSL/TLS Configuration

We recommend using a reverse proxy like Nginx or Traefik to handle SSL termination.

**Nginx Example:**

```nginx
server {
    listen 443 ssl;
    server_name shield.yourcompany.com;

    ssl_certificate /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;

    location / {
        proxy_pass http://web:3000;
    }

    location /api {
        proxy_pass http://api:4000;
    }
}
```

## Monitoring Setup

- **Prometheus**: Expose metrics at `/metrics` endpoint (enabled by default).
- **Grafana**: Import our standard dashboard JSON to visualize:
  - Tests per minute
  - Average latency
  - Error rates
  - Worker queue depth
