# Architecture Overview

The Apire AI Security Platform follows a **microservices architecture**, allowing each tool to operate independently while sharing a common authentication and reporting layer.

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
└───┬────────┬──────────┬──────────┬──────────────────────────┘
    │        │          │          │
    │ /      │ /shield  │ /redteam │ /compliance
    ▼        ▼          ▼          ▼
┌──────┐ ┌────────┐ ┌───────────┐ ┌──────────────┐
│ Core │ │Prompt  │ │  RedTeam  │ │  Compliance  │
│  UI  │ │Shield  │ │    Kit    │ │   Checker    │
│      │ │   UI   │ │     UI    │ │      UI      │
└──┬───┘ └───┬────┘ └─────┬─────┘ └──────┬───────┘
   │         │            │               │
   │ /api/   │ /api/      │ /api/         │ /api/
   │         │ shield     │ redteam       │ compliance
   ▼         ▼            ▼               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend Services                           │
│  ┌──────────┐  ┌──────────┐  ┌─────────┐  ┌─────────────┐ │
│  │  Core    │  │ Shield   │  │ RedTeam │  │ Compliance  │ │
│  │  API     │  │  API     │  │   API   │  │     API     │ │
│  │(Express) │  │(Express) │  │(NestJS) │  │  (Express)  │ │
│  └────┬─────┘  └────┬─────┘  └────┬────┘  └──────┬──────┘ │
└───────┼─────────────┼─────────────┼───────────────┼────────┘
        │             │             │               │
        ▼             ▼             ▼               ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌──────────┐  ┌──────────┐  ┌─────────┐  ┌─────────────┐ │
│  │PostgreSQL│  │PostgreSQL│  │ MongoDB │  │  PostgreSQL │ │
│  │  +       │  │  +       │  │   +     │  │     +       │ │
│  │          │  │  Redis   │  │RabbitMQ │  │Elasticsearch│ │
│  └──────────┘  └──────────┘  └─────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Shared Components

### 🔐 Authentication
-   **JWT-based Auth**: The Core Platform issues JWT tokens upon login.
-   **Shared Secret**: All microservices share a `JWT_SECRET` to validate tokens.
-   **Middleware**: Each service implements middleware to protect API routes.
-   **Token Expiry**: Configurable expiration (default: 24 hours)

**Authentication Flow:**
```
1. User → POST /api/v1/auth/login → Core API
2. Core API validates credentials
3. Core API → JWT Token → User
4. User → Request + JWT → Any Service
5. Service validates JWT signature
6. Service → Response (if valid)
```

### 🏗️ Infrastructure
-   **Docker**: Each service is containerized.
-   **Docker Compose**: Orchestrates the local development environment.
-   **Kubernetes**: Production deployment manifests are provided for all services.
-   **Nginx/Ingress**: Reverse proxy for routing requests

### 📊 Observability
- **Logging**: Structured JSON logs with Winston
- **Metrics**: Prometheus-compatible endpoints
- **Tracing**: OpenTelemetry support (planned)
- **Health Checks**: `/health` endpoint on all services

## Service Communication

### API Gateway Pattern
All external traffic goes through a gateway that:
- Routes requests to appropriate services
- Handles SSL termination
- Provides rate limiting
- Enforces CORS policies

### Inter-Service Communication
Services can communicate directly when needed:
- **Synchronous**: REST APIs
- **Asynchronous**: Message queues (RabbitMQ)

## Data Flow

### User Authentication Flow
1.  **User Login**: User logs in via Core Dashboard → Core API.
2.  **Token Issue**: Core API validates credentials and returns a JWT.
3.  **Token Storage**: Frontend stores JWT in localStorage/cookie.
4.  **Tool Access**: User navigates to a tool (e.g., Prompt Shield).
5.  **Authenticated Request**: Tool's frontend sends JWT in Authorization header.
6.  **Validation**: Backend validates the JWT signature using shared secret.
7.  **Execution**: Tool performs its specific security task (scan, attack, check).

### Security Scanning Flow (Prompt Shield Example)
```
User Input → Frontend → API (POST /api/v1/test)
                ↓
           Validation Layer
                ↓
           Pattern Matching
                ↓
           Risk Calculation
                ↓
           Database Logging
                ↓
           Response → Frontend → User
```

## Technology Stack

| Component | Technologies |
|-----------|-------------|
| **Frontend** | React, Vite, Tailwind CSS, Next.js (RedTeam) |
| **Backend** | Node.js, Express, TypeScript, NestJS (RedTeam) |
| **Databases** | PostgreSQL, MongoDB, Redis, Elasticsearch |
| **Testing** | Jest, Vitest, Playwright |
| **Container** | Docker, Docker Compose |
| **Orchestration** | Kubernetes, Helm (planned) |
| **CI/CD** | GitHub Actions |

## Deployment Topologies

### Development (Local)
- All services on `localhost`
- Docker Compose orchestration
- Hot reload enabled
- Shared network bridge

### Staging/Production (Kubernetes)
- Multi-pod deployment
- Service mesh (optional)
- Horizontal pod autoscaling
- External load balancer
- Persistent volume claims

## Security Architecture

### Defense in Depth
1. **Network Layer**: TLS/SSL encryption, firewall rules
2. **API Gateway**: Rate limiting, CORS, authentication
3. **Application Layer**: Input validation, parameterized queries
4. **Data Layer**: Encryption at rest, access controls

### Secrets Management
- Environment variables for configuration
- Kubernetes secrets for sensitive data
- Never hardcode credentials
- Rotate secrets regularly

## Performance Considerations

### Caching Strategy
- **Redis**: Session data, frequent queries
- **CDN**: Static assets (frontend)
- **Application**: Computed risk scores (TTL: 5 minutes)

### Scalability
Each service can scale independently:
- **Core API**: Scale for user load
- **Prompt Shield**: Scale for scan volume
- **RedTeam Kit**: Scale for concurrent simulations
- **Compliance**: Scale for audit frequency

## Next Steps

- 📖 **[Deployment Guide](Deployment)**: Learn how to deploy this architecture
- 🔌 **[API Reference](API-Reference)**: Explore the API endpoints
- 🛠️ **[Contributing](Contributing)**: Help us improve the architecture
