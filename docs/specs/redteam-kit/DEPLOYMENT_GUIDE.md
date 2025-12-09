# Deployment Guide

## Production Requirements

- **CPU**: 4+ Cores (for Worker nodes)
- **RAM**: 8GB+
- **Storage**: 50GB+ SSD (MongoDB)

## Docker Swarm

```bash
docker stack deploy -c docker-compose.prod.yml redteam
```

## Kubernetes

We use a Helm chart for deployment.

```bash
helm repo add apire https://charts.apire.ai
helm install redteam apire/redteam-kit \
  --set ingress.enabled=true \
  --set ingress.host=redteam.corp.com
```

## Scaling

- **Workers**: The `redteam-worker` service is CPU bound during analysis. Scale this deployment based on CPU usage.
- **RabbitMQ**: Ensure high availability for the queue.
- **MongoDB**: Use a replica set for production data safety.
