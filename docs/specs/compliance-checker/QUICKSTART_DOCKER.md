# Quickstart: Docker

## Prerequisites

- Docker & Docker Compose
- 6GB+ RAM recommended (Elasticsearch is heavy)

## Steps

1.  **Clone Repo**:

    ```bash
    git clone https://github.com/apireaisecurity/compliance-checker.git
    cd compliance-checker
    ```

2.  **Launch**:

    ```bash
    docker-compose up -d
    ```

    _Note: First run may take a few minutes to initialize Elasticsearch._

3.  **Verify**:
    Run `docker-compose ps`. Ensure `elasticsearch`, `postgres`, `api`, and `web` are up.

4.  **Login**:
    Go to `http://localhost:3000`.
    Default User: `admin@apire.ai` / `admin123`

## Troubleshooting Elasticsearch

If ES fails to start, you might need to increase map count:

```bash
sysctl -w vm.max_map_count=262144
```
