# Architecture: APIRE Prompt Shield

## System Overview

APIRE Prompt Shield is designed as a scalable, microservices-based platform. It separates concerns between the user-facing API, the heavy-lifting analysis workers, and the real-time web interface.

![Architecture Diagram](https://via.placeholder.com/800x400?text=Architecture+Diagram)

## Components

### 1. Web UI (Frontend)
- **Tech Stack**: React 18, TypeScript, Tailwind CSS, Vite.
- **Responsibility**: Provides the dashboard, test builder, and results visualization.
- **Communication**: Talks to the API Service via REST and WebSocket.

### 2. API Service (Backend)
- **Tech Stack**: Node.js 20, Express, TypeScript.
- **Responsibility**:
  - Handles authentication and authorization.
  - Validates input requests.
  - Manages CRUD operations for tests, rules, and users.
  - Dispatches jobs to the Message Queue.
  - Serves WebSocket connections for real-time updates.

### 3. Worker Service
- **Tech Stack**: Node.js 20, TypeScript.
- **Responsibility**:
  - Consumes jobs from the Message Queue.
  - Executes the actual security scans (CPU-intensive).
  - Runs ML models for toxicity and jailbreak detection.
  - Updates the database and cache with results.
- **Scalability**: Can be horizontally scaled to handle high throughput.

### 4. Message Queue
- **Tech Stack**: BullMQ (backed by Redis).
- **Responsibility**: Decouples the API from the Worker, ensuring reliable job processing and buffering bursts of traffic.

### 5. Data Storage
- **PostgreSQL**: Primary persistent storage for relational data (Users, Tests, Organizations).
- **Redis**: Used for caching, session management, and the message queue.

## Data Flow

1.  **Submission**: User submits a prompt test via Web UI or API.
2.  **Queuing**: API Service validates the request and pushes a job to the Redis Queue. Returns a `jobId` immediately.
3.  **Processing**: A Worker picks up the job. It runs the configured checks (Injection, PII, etc.) in parallel.
4.  **Result Storage**: Worker saves the final report to PostgreSQL.
5.  **Notification**: Worker publishes a "completed" event to Redis Pub/Sub.
6.  **Real-time Update**: API Service subscribes to the event and pushes the result to the client via WebSocket.

## Scalability Patterns

- **Horizontal Scaling**: The API and Worker services are stateless and can be scaled independently based on load (e.g., CPU vs. Network I/O).
- **Caching**: Redis caches frequent queries (like attack patterns) to reduce DB load.
- **Database Read Replicas**: For high read traffic (analytics), read replicas can be added to PostgreSQL.

## Security Considerations

- **Input Validation**: All inputs are strictly validated using Zod schemas.
- **Secrets Management**: No secrets are stored in code. Environment variables are used.
- **Isolation**: Workers run analysis in a sandboxed context where possible to prevent RCE from malicious prompts.
- **Rate Limiting**: Implemented at the API gateway level to prevent abuse.

## Database Schema

### `users`
- `id`: UUID
- `email`: String
- `password_hash`: String
- `role`: Enum (admin, user)

### `tests`
- `id`: UUID
- `user_id`: UUID (FK)
- `input`: Text
- `config`: JSONB
- `status`: Enum (queued, processing, completed, failed)
- `result`: JSONB
- `created_at`: Timestamp

### `api_keys`
- `id`: UUID
- `user_id`: UUID (FK)
- `key_hash`: String
- `name`: String
