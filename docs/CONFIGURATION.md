# Configuration Reference

## Overview

This document provides a comprehensive reference for all environment variables used across the Apire AI Security Platform. Each tool has its own backend and frontend configuration.

## 🔒 Security Best Practices

**CRITICAL SECURITY GUIDELINES:**

- ❌ **Never commit `.env` files to version control**
- ✅ Use secrets management systems in production (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault)
- ✅ Rotate API keys, JWT secrets, and database credentials regularly (at least quarterly)
- ✅ Use strong passwords: minimum 16 characters, mixed case, numbers, special symbols
- ✅ Restrict CORS origins in production (never use `*`)
- ✅ Enable API key authentication (`REQUIRE_API_KEY=true`) in production
- ✅ Use HTTPS/TLS for all external connections
- ✅ Set `NODE_ENV=production` in production environments

---

## Configuration by Tool

### 1. 🛡️ Prompt Shield

Analyzes prompts for security risks including injection attacks and jailbreak attempts.

#### Backend (Port 3001)

| Variable | Required | Default | Description | Example | Security Level |
|----------|----------|---------|-------------|---------|----------------|
| `PORT` | No | `3001` | API server port | `3001` | Low |
| `NODE_ENV` | No | `development` | Environment mode | `production` | Low |
| `DATABASE_URL` | Yes | - | PostgreSQL connection string | `postgres://user:pass@localhost:5432/shield` | **HIGH** |
| `REDIS_URL` | Yes | - | Redis connection string for caching | `redis://localhost:6379` | Medium |
| `JWT_SECRET` | Yes | - | JWT signing secret (min 32 chars) | `your-super-secret-jwt-key-min-32-chars` | **CRITICAL** |
| `REQUIRE_API_KEY` | No | `false` | Enable API key authentication | `true` | High |
| `API_KEY` | Conditional | - | API key for authentication (required if REQUIRE_API_KEY=true) | `sk_live_1234abcd...` | **CRITICAL** |
| `RATE_LIMIT_WINDOW_MS` | No | `60000` | Rate limit time window in milliseconds | `60000` (1 min) | Medium |
| `RATE_LIMIT_MAX` | No | `100` | Maximum requests per window | `100` | Medium |
| `CORS_ORIGINS` | No | `*` | Allowed CORS origins (comma-separated) | `https://app.example.com,https://admin.example.com` | High |
| `LOG_LEVEL` | No | `info` | Logging verbosity level | `debug`, `info`, `warn`, `error` | Low |

**`.env.example` location**: `apire-prompt-shield/backend/.env.example`

**Example Configuration**:
```bash
# Development
PORT=3001
NODE_ENV=development
DATABASE_URL=postgres://postgres:postgres@localhost:5432/prompt_shield
REDIS_URL=redis://localhost:6379
JWT_SECRET=dev-secret-change-in-production-min-32-characters
REQUIRE_API_KEY=false
LOG_LEVEL=debug
CORS_ORIGINS=*

# Production
PORT=3001
NODE_ENV=production
DATABASE_URL=${DATABASE_URL_SECRET}
REDIS_URL=${REDIS_URL_SECRET}
JWT_SECRET=${JWT_SECRET_FROM_VAULT}
REQUIRE_API_KEY=true
API_KEY=${API_KEY_FROM_VAULT}
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
CORS_ORIGINS=https://yourdomain.com
LOG_LEVEL=warn
```

#### Frontend (Port 3002)

| Variable | Required | Default | Description | Example |
|----------|----------|---------|-------------|---------|
| `VITE_API_BASE_URL` | No | `http://localhost:3001` | Backend API base URL | `https://api.example.com` |

**`.env.example` location**: `apire-prompt-shield/frontend/.env.example`

---

### 2. ⚔️ RedTeam Kit

Advanced adversarial testing and security auditing toolkit for LLMs.

#### Backend (Port 3005)

| Variable | Required | Default | Description | Example | Security Level |
|----------|----------|---------|-------------|---------|----------------|
| `PORT` | No | `3005` | API server port | `3005` | Low |
| `NODE_ENV` | No | `development` | Environment mode | `production` | Low |
| `MONGODB_URI` | Yes | - | MongoDB connection string | `mongodb://localhost:27017/redteam` | **HIGH** |
| `RABBITMQ_URL` | Yes | - | RabbitMQ connection string for job queues | `amqp://localhost:5672` | Medium |
| `JWT_SECRET` | Yes | - | JWT signing secret (min 32 chars) | `your-jwt-secret-min-32-chars` | **CRITICAL** |
| `REQUIRE_API_KEY` | No | `false` | Enable API key authentication | `true` | High |
| `API_KEY` | Conditional | - | API key for authentication | `sk_live_redteam...` | **CRITICAL** |
| `RATE_LIMIT_WINDOW_MS` | No | `3600000` | Rate limit window (1 hour default) | `3600000` | Medium |
| `RATE_LIMIT_MAX` | No | `10` | Max requests per window (10/hour default) | `10` | Medium |
| `CORS_ORIGINS` | No | `*` | Allowed CORS origins | `https://app.example.com` | High |
| `LOG_LEVEL` | No | `info` | Logging level | `debug`, `info`, `warn`, `error` | Low |

**`.env.example` location**: `apire-redteam-kit/backend/.env.example`

**Example Configuration**:
```bash
# Development
PORT=3005
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/redteam
RABBITMQ_URL=amqp://localhost:5672
JWT_SECRET=dev-secret-change-in-production
REQUIRE_API_KEY=false
LOG_LEVEL=debug

# Production
PORT=3005
NODE_ENV=production
MONGODB_URI=${MONGODB_URI_SECRET}
RABBITMQ_URL=${RABBITMQ_URL_SECRET}
JWT_SECRET=${JWT_SECRET_FROM_VAULT}
REQUIRE_API_KEY=true
API_KEY=${API_KEY_FROM_VAULT}
RATE_LIMIT_MAX=10
CORS_ORIGINS=https://yourdomain.com
LOG_LEVEL=warn
```

#### Frontend (Port 3006)

| Variable | Required | Default | Description | Example |
|----------|----------|---------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:3005` | Backend API URL | `https://api.example.com` |

**`.env.example` location**: `apire-redteam-kit/frontend/.env.example`

---

### 3. ✅ Compliance Checker

Automated regulatory compliance scanner for GDPR, HIPAA, SOC 2, and EU AI Act.

#### Backend (Port 3003)

| Variable | Required | Default | Description | Example | Security Level |
|----------|----------|---------|-------------|---------|----------------|
| `PORT` | No | `3003` | API server port | `3003` | Low |
| `NODE_ENV` | No | `development` | Environment mode | `production` | Low |
| `DATABASE_URL` | Yes | - | PostgreSQL connection string for audit logs | `postgres://user:pass@localhost:5432/compliance` | **HIGH** |
| `ELASTICSEARCH_URL` | Yes | - | Elasticsearch connection for full-text search | `http://localhost:9200` | Medium |
| `REDIS_URL` | No | - | Redis for caching (optional) | `redis://localhost:6379` | Medium |
| `JWT_SECRET` | Yes | - | JWT signing secret | `your-jwt-secret` | **CRITICAL** |
| `REQUIRE_API_KEY` | No | `false` | Enable API key authentication | `true` | High |
| `API_KEY` | Conditional | - | API key | `sk_live_compliance...` | **CRITICAL** |
| `RATE_LIMIT_WINDOW_MS` | No | `3600000` | Rate limit window (1 hour) | `3600000` | Medium |
| `RATE_LIMIT_MAX` | No | `20` | Max requests per window | `20` | Medium |
| `CORS_ORIGINS` | No | `*` | Allowed CORS origins | `https://app.example.com` | High |
| `LOG_LEVEL` | No | `info` | Logging level | `debug`, `info`, `warn`, `error` | Low |

**`.env.example` location**: `apire-compliance-checker/backend/.env.example`

#### Frontend (Port 3004)

| Variable | Required | Default | Description | Example |
|----------|----------|---------|-------------|---------|
| `VITE_API_BASE_URL` | No | `http://localhost:3003` | Backend API URL | `https://api.example.com` |

**`.env.example` location**: `apire-compliance-checker/frontend/.env.example`

---

### 4. 🏠 Core Platform (Legacy)

Used for integration tests and unified dashboard. Not deployed independently in production.

#### Backend (Port 3000)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `3000` | API server port |
| `NODE_ENV` | No | `development` | Environment mode |
| `DATABASE_URL` | Yes | - | PostgreSQL connection string |
| `JWT_SECRET` | Yes | - | JWT signing secret |

**`.env.example` location**: `backend/.env.example`

#### Frontend (Port 5173)

Dashboard/Launchpad for accessing all three security tools.

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_BASE_URL` | No | `http://localhost:3000` | Backend API URL |

**`.env.example` location**: `frontend/.env.example`

---

## Observability Configuration

### Prometheus (Port 9090)

| Variable | Default | Description |
|----------|---------|-------------|
| `PROMETHEUS_PORT` | `9090` | Prometheus server port |
| `PROMETHEUS_RETENTION_TIME` | `15d` | Data retention period |

### Grafana (Port 3000)

| Variable | Default | Description | Security Level |
|----------|---------|-------------|----------------|
| `GF_SECURITY_ADMIN_PASSWORD` | `admin` | Grafana admin password | **CRITICAL** |
| `GF_SERVER_ROOT_URL` | `http://localhost:3000` | Grafana public URL | Low |

**⚠️ Change the default Grafana password immediately in production!**

---

## Environment-Specific Templates

### Development (.env.development)

Optimized for local development with debugging enabled and relaxed security.

```bash
NODE_ENV=development
LOG_LEVEL=debug
REQUIRE_API_KEY=false
CORS_ORIGINS=*
RATE_LIMIT_MAX=1000

# Use local databases
DATABASE_URL=postgres://postgres:postgres@localhost:5432/dbname
REDIS_URL=redis://localhost:6379
MONGODB_URI=mongodb://localhost:27017/dbname
```

### Staging (.env.staging)

Production-like environment for testing.

```bash
NODE_ENV=staging
LOG_LEVEL=info
REQUIRE_API_KEY=true
CORS_ORIGINS=https://staging.yourdomain.com
RATE_LIMIT_MAX=100

# Use staging databases with authentication
DATABASE_URL=${STAGING_DATABASE_URL}
JWT_SECRET=${STAGING_JWT_SECRET}
API_KEY=${STAGING_API_KEY}
```

### Production (.env.production)

Maximum security and performance optimization.

```bash
NODE_ENV=production
LOG_LEVEL=warn
REQUIRE_API_KEY=true
CORS_ORIGINS=https://yourdomain.com
RATE_LIMIT_MAX=100

# Use secrets management
DATABASE_URL=${DATABASE_URL_SECRET}
REDIS_URL=${REDIS_URL_SECRET}
MONGODB_URI=${MONGODB_URI_SECRET}
JWT_SECRET=${JWT_SECRET_FROM_VAULT}
API_KEY=${API_KEY_FROM_VAULT}
GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD_SECRET}
```

---

## Docker Compose Configuration

All environment variables can be set in `docker-compose.codespaces.yml` or via `.env` file at the root.

**Example docker-compose override**:
```yaml
services:
  shield-api:
    environment:
      - PORT=3001
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
      - REQUIRE_API_KEY=true
      - API_KEY=${SHIELD_API_KEY}
```

---

## Kubernetes Configuration

### Using ConfigMaps (Non-Sensitive Data)

```bash
kubectl create configmap shield-config \
  --from-literal=PORT=3001 \
  --from-literal=NODE_ENV=production \
  --from-literal=LOG_LEVEL=warn
```

### Using Secrets (Sensitive Data)

```bash
kubectl create secret generic shield-secrets \
  --from-literal=DATABASE_URL='postgres://...' \
  --from-literal=JWT_SECRET='your-secret' \
  --from-literal=API_KEY='your-api-key'
```

**Reference in Deployment**:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: shield-api
spec:
  template:
    spec:
      containers:
      - name: api
        envFrom:
        - configMapRef:
            name: shield-config
        - secretRef:
            name: shield-secrets
```

---

## Validation & Testing

### Validate Configuration Before Deployment

```bash
# Check all .env.example files exist
./scripts/validate-config.sh

# Test configuration with Docker Compose
docker-compose -f docker-compose.codespaces.yml config

# Verify Kubernetes manifests
kubectl kustomize kubernetes/ | kubectl apply --dry-run=client -f -
```

### Test Services with Configuration

```bash
# Start services
./scripts/start-codespace.sh

# Test health endpoints
curl http://localhost:3001/health
curl http://localhost:3003/health
curl http://localhost:3005/

# Test with API key
curl -H "X-API-Key: your-key" http://localhost:3001/api/v1/tests
```

---

## Troubleshooting

### Common Issues

**Issue**: Service won't start - "DATABASE_URL is required"
- **Solution**: Ensure `.env` file exists and `DATABASE_URL` is set

**Issue**: "JWT_SECRET must be at least 32 characters"
- **Solution**: Generate a strong secret: `openssl rand -base64 48`

**Issue**: CORS errors in browser
- **Solution**: Add your frontend URL to `CORS_ORIGINS`

**Issue**: Rate limit errors
- **Solution**: Increase `RATE_LIMIT_MAX` or `RATE_LIMIT_WINDOW_MS`

### Generating Secure Secrets

```bash
# JWT Secret (64 characters)
openssl rand -base64 48

# API Key (UUID format)
uuidgen

# Strong Password (32 characters)
openssl rand -base64 24
```

---

## Migration from Previous Versions

### v0.x to v1.0.0

**Breaking Changes**:
- Core Platform removed - services now independent
- Port changes: RedTeam Kit moved from 3003/3004 to 3005/3006
- New required variables: `REQUIRE_API_KEY`, `RATE_LIMIT_MAX`

**Migration Steps**:
1. Update port numbers in `.env` and `docker-compose.yml`
2. Add `REQUIRE_API_KEY` and `API_KEY` for production
3. Add rate limiting configuration
4. Update CORS origins to be specific (not `*`)
5. Test all services after configuration update

---

## Additional Resources

- [API Documentation](./API.md)
- [Deployment Guide](./DEPLOY_ON_CODESPACES.md)
- [Security Guide](../SECURITY.md)
- [Docker Compose Reference](../docker-compose.codespaces.yml)
- [Kubernetes Manifests](../kubernetes/)
