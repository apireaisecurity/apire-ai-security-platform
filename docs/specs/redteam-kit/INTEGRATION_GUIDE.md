# Integration Guide

## CI/CD Integration

### GitHub Actions

```yaml
- name: Run Red Team Attack
  uses: apire/redteam-action@v1
  with:
    api-key: ${{ secrets.REDTEAM_KEY }}
    target-url: https://staging-api.myapp.com
    scenario: "prompt-injection-basic"
    fail-on-success: true
```

### GitLab CI

```yaml
redteam_scan:
  image: apire/cli
  script:
    - apire-cli scan --target $STAGING_URL --scenario all
```

## Webhooks

Configure webhooks in **Settings > Integrations**.

**Payload Example:**

```json
{
  "event": "campaign.completed",
  "campaignId": "123",
  "successRate": 0.15,
  "criticalFindings": 2
}
```

## Jira Integration

Automatically create tickets for successful attacks.

1.  Go to **Settings > Integrations > Jira**.
2.  Enter URL, Email, and API Token.
3.  Map severity levels to Jira priorities.
