# Configuration Guide

## Environment Variables

| Variable         | Description                         | Default               |
| ---------------- | ----------------------------------- | --------------------- |
| `PORT`           | API Port                            | 3000                  |
| `DB_HOST`        | Postgres Host                       | localhost             |
| `ES_NODE`        | Elasticsearch URL                   | http://localhost:9200 |
| `MINIO_ENDPOINT` | S3 Endpoint                         | localhost             |
| `ENCRYPTION_KEY` | Key for encrypting sensitive config | -                     |

## Policy Configuration (`policies.yaml`)

You can define custom policies in a YAML file.

```yaml
policies:
  - id: "custom-password-policy"
    name: "Strong Password Requirement"
    severity: "high"
    check:
      type: "regex"
      pattern: "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
      target: "config/auth.json"
```

## Framework Selection

Enable or disable frameworks in the UI or via `config/frameworks.json`.

```json
{
  "enabled": ["gdpr", "eu_ai_act"],
  "disabled": ["pci_dss"]
}
```
