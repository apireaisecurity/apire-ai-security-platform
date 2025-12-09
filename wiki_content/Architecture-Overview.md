# Architecture Overview

The Apire AI Security Platform follows a **microservices architecture**, allowing each tool to operate independently with its own backend, frontend, and data layer.

## 🎯 Design Principles

1. **Modularity**: Each service can be deployed independently
2. **Scalability**: Horizontal scaling for high-load scenarios
3. **Resilience**: Service failures don't cascade
4. **Flexibility**: Use only the components you need

## High-Level Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        User / Browser                        │
└────────────────┬────────────────────────────────────────────┘
                 │ HTTPS
                 ▼
┌────────────────────────────────────────────────────────────┐
│              Gateway (Nginx / Ingress)                      │
└────────┬──────────┬──────────┬──────────────────────────────┘
         │          │          │
  /shield│   /redteam│   /compliance
         ▼          ▼          ▼
      ┌────────┐ ┌───────────┐ ┌──────────────┐
      │Prompt  │ │  RedTeam  │ │  Compliance  │
      │Shield  │ │    Kit    │ │   Checker    │
      │   UI   │ │     UI    │ │      UI      │
      └───┬────┘ └─────┬─────┘ └──────┬───────┘
          │            │               │
   /api/  │     /api/  │        /api/  │
   shield │     redteam│     compliance│
          ▼            ▼               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend Services                           │
│  ┌──────────┐  ┌─────────┐  ┌─────────────┐                │
│  │ Shield   │  │ RedTeam │  │ Compliance  │                │
│  │  API     │  │   API   │  │     API     │                │
│  │(Express) │  │(NestJS) │  │  (Express)  │                │
│  └────┬─────┘  └────┬────┘  └──────┬──────┘                │
└───────┼─────────────┼───────────────┼────────────────────────┘
        │             │               │
        ▼             ▼               ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌──────────┐  ┌─────────┐  ┌─────────────┐                │
│  │PostgreSQL│  │ MongoDB │  │  PostgreSQL │                │
│  │  +       │  │   +     │  │     +       │                │
│  │  Redis   │  │RabbitMQ │  │Elasticsearch│                │
│  └──────────┘  └─────────┘  └─────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

## Tool Components

### 🛡️ Prompt Shield
-   **Frontend**: React UI for testing prompt injections
-   **Backend**: Express.js API with multiple detection algorithms
-   **Database**: PostgreSQL for analysis logs, Redis for caching
-   **Port**: Frontend on 3002, API on 3001

### 🎯 RedTeam Kit
-   **Frontend**: React UI for attack simulation
-   **Backend**: NestJS API for orchestrating attacks
-   **Database**: MongoDB for scenarios/reports, RabbitMQ for async jobs
-   **Port**: Frontend on 3006, API on 3005

### ✅ Compliance Checker
-   **Frontend**: React UI for compliance scanning
-   **Backend**: Express.js API for policy audits
-   **Database**: PostgreSQL for audit logs, Elasticsearch for full-text search
-   **Port**: Frontend on 3004, API on 3003

## 🏗️ Infrastructure
-   **Docker**: Each service is containerized
-   **Docker Compose**: Orchestrates the local development environment
-   **Kubernetes**: Production deployment manifests are provided for all services
-   **Nginx/Ingress**: Reverse proxy for routing requests

## 📊 Observability
- **Logging**: Structured JSON logs with Winston
- **Metrics**: Prometheus-compatible endpoints
- **Tracing**: OpenTelemetry support (optional)

## Component Communication

Each tool operates independently with its own API. Integration patterns:

### 1. **Direct API Calls**
```javascript
// Example: Call Shield API from your app
const response = await fetch('http://shield-api:3001/api/v1/test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ input: userPrompt })
});
```

### 2. **Gateway Routing**
```nginx
location /shield/ {
  proxy_pass http://shield-api:3001/;
}
location /redteam/ {
  proxy_pass http://redteam-api:3005/;
}
location /compliance/ {
  proxy_pass http://compliance-api:3003/;
}
```

### 3. **SDK Integration** (Coming Soon)
```javascript
import { PromptShield, RedTeamKit, ComplianceChecker } from '@apire/sdk';

const shield = new PromptShield({ apiKey: 'your-key' });
const result = await shield.analyze(userInput);
```

## Data Persistence

Each tool manages its own data:

| Tool | Storage | Purpose |
|------|---------|---------|
| **Prompt Shield** | PostgreSQL + Redis | Analysis logs + caching |
| **RedTeam Kit** | MongoDB + RabbitMQ | Scenarios + async tasks |
| **Compliance Checker** | PostgreSQL + Elasticsearch | Audit logs + search |

## Deployment Options

### 🐳 Docker Compose (Development)
```bash
docker-compose up -d
```
Starts all services locally with default configurations.

### ☸️ Kubernetes (Production)
```bash
kubectl apply -k kubernetes/
```
Deploys services to a K8s cluster with:
- Load balancing
- Auto-scaling
- Health checks
- Resource limits

### 🎯 Tool-Specific Deployment
Each tool can be deployed independently:
```bash
cd apire-prompt-shield
docker-compose up -d
```

## Security Architecture

### Network Isolation
- Each tool runs in its own network namespace
- Inter-service communication via internal networks only
- Public exposure only through gateway/ingress

### Data Protection
- Environment variables for sensitive config
- Secrets management via Docker Secrets or K8s Secrets
- Database encryption at rest (configurable)
- TLS/HTTPS for all external communication

### API Security
- Rate limiting on all endpoints
- Input validation and sanitization
- CORS configuration
- Optional API key authentication

## Scalability

### Horizontal Scaling
Each service can scale independently:
```bash
docker-compose up --scale shield-api=3
```

### Caching Strategy
- Redis for frequently accessed data
- CDN for static assets
- API response caching with TTL

### Database Optimization
- Connection pooling
- Query optimization
- Read replicas for high-load scenarios
- Indexing on frequently queried fields

## Monitoring & Health Checks

All services expose health endpoints:
```
GET /health       - Basic liveness check
GET /health/ready - Readiness check (DB connections, etc.)
GET /metrics      - Prometheus metrics
```

Example health check response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "services": {
    "database": "connected",
    "cache": "connected"
  },
  "uptime": 3600
}
```

## Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React, TypeScript, Vite, TailwindCSS |
| **Backend** | Node.js, Express, NestJS, TypeScript |
| **Databases** | PostgreSQL, MongoDB, Redis, Elasticsearch |
| **Messaging** | RabbitMQ |
| **Containerization** | Docker, Docker Compose |
| **Orchestration** | Kubernetes |
| **Gateway** | Nginx |
| **Testing** | Jest, Playwright |
| **Logging** | Winston |

## Further Reading
- [Deployment Guide](Deployment)
- [Getting Started](Getting-Started)
- [API Reference](API-Reference)
