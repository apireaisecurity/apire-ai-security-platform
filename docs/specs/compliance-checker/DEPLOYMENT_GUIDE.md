# Deployment Guide

## Requirements
- **PostgreSQL**: 13+
- **Elasticsearch**: 7.10+
- **Redis**: 6+
- **MinIO/S3**: For object storage.

## Kubernetes

```bash
helm install compliance apire/compliance-checker
```

## Data Persistence
Ensure you have Persistent Volumes (PVs) for:
- Postgres (Compliance data)
- Elasticsearch (Logs and search index)
- MinIO (Report and evidence storage)

## Security
- Enable TLS for all internal communication.
- Use RBAC in the application to restrict access to sensitive reports.
- Enable Audit Logging in the application config.
