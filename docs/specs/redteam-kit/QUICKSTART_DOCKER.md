# Quickstart: Docker

Get APIRE RedTeam Kit running in 5 minutes.

## Prerequisites
- Docker & Docker Compose
- 4GB+ RAM recommended

## Steps

1.  **Clone Repo**:
    ```bash
    git clone https://github.com/apireaisecurity/redteam-kit.git
    cd redteam-kit
    ```

2.  **Environment Setup**:
    ```bash
    cp .env.example .env
    # Edit .env if needed (e.g., OPENAI_API_KEY for the analyzer)
    ```

3.  **Launch**:
    ```bash
    docker-compose up -d
    ```

4.  **Verify**:
    Run `docker-compose ps` to ensure all 5 containers are healthy:
    - `redteam-web`
    - `redteam-api`
    - `redteam-worker`
    - `mongo`
    - `rabbitmq`

5.  **Login**:
    Go to `http://localhost:3000`.
    Default User: `admin` / `password`

## Stopping
```bash
docker-compose down
```
To remove data volumes: `docker-compose down -v`
