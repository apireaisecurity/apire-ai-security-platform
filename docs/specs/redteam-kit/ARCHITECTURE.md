# Architecture: APIRE RedTeam Kit

## High-Level Design

The system follows an event-driven microservices pattern.

![Architecture](https://via.placeholder.com/800x400?text=RedTeam+Architecture)

## Components

1.  **API Gateway (NestJS)**: Handles GraphQL/REST requests, auth, and orchestration.
2.  **Worker Nodes (Node.js)**:
    - Execute attack scenarios.
    - Interact with Target LLMs.
    - Run "Judge" models (AI evaluating AI) to score responses.
3.  **RabbitMQ**: Distributes attack jobs to workers.
4.  **MongoDB**: Stores scenarios, campaigns, and unstructured result data.
5.  **Socket.io**: Pushes real-time progress updates to the frontend.

## Attack Execution Flow

1.  User launches a Campaign.
2.  API creates a `Campaign` record and splits it into `Job`s (one per scenario/target).
3.  `Job`s are pushed to RabbitMQ.
4.  Worker picks up a `Job`.
5.  Worker executes the steps defined in the Scenario (Prompt -> Wait -> Analyze).
6.  Worker saves `Result` to MongoDB.
7.  Worker emits `job.completed` event.
8.  API updates the UI via WebSocket.

## Extensibility

- **Plugin System**: Custom attack modules can be loaded into Workers.
- **Target Adapters**: Standard interface for connecting to any LLM API (OpenAI, Azure, Bedrock, HuggingFace).
