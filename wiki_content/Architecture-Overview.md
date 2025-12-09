# Architecture Overview

The Apire AI Security Platform follows a **microservices architecture**, allowing each tool to operate independently while sharing a common authentication and reporting layer.

## High-Level Diagram

```mermaid
graph TD
    User[User / Developer] -->|HTTPS| Gateway[Nginx / Ingress]
    
    subgraph "Core Platform"
        Gateway -->|/| CoreWeb[Core Dashboard (React)]
        Gateway -->|/api| CoreAPI[Core Backend (Express)]
        CoreAPI --> Postgres[(PostgreSQL)]
    end
    
    subgraph "Prompt Shield"
        Gateway -->|/shield| ShieldWeb[Shield UI (React)]
        Gateway -->|/api/shield| ShieldAPI[Shield API (Express)]
        ShieldAPI --> Redis[(Redis Cache)]
        ShieldAPI --> Postgres
    end
    
    subgraph "RedTeam Kit"
        Gateway -->|/redteam| RedWeb[RedTeam UI (Next.js)]
        Gateway -->|/api/redteam| RedAPI[RedTeam API (NestJS)]
        RedAPI --> Mongo[(MongoDB)]
        RedAPI --> RabbitMQ[Message Queue]
    end
    
    subgraph "Compliance Checker"
        Gateway -->|/compliance| CompWeb[Compliance UI (Vue.js)]
        Gateway -->|/api/compliance| CompAPI[Compliance API (Express)]
        CompAPI --> Elastic[(Elasticsearch)]
    end
```

## Shared Components

### Authentication
-   **JWT-based Auth**: The Core Platform issues JWT tokens upon login.
-   **Shared Secret**: All microservices share a `JWT_SECRET` to validate tokens.
-   **Middleware**: Each service implements middleware to protect API routes.

### Infrastructure
-   **Docker**: Each service is containerized.
-   **Docker Compose**: Orchestrates the local development environment.
-   **Kubernetes**: Production deployment manifests are provided for all services.

## Data Flow

1.  **User Login**: User logs in via Core Dashboard -> Core API.
2.  **Token Issue**: Core API returns a JWT.
3.  **Tool Access**: User navigates to a tool (e.g., Prompt Shield).
4.  **Request**: The tool's frontend sends the JWT to its backend API.
5.  **Validation**: The backend validates the JWT signature.
6.  **Execution**: The tool performs its specific security task (scan, attack, check).
