# Integration Examples

## GitHub Actions (Code Scanning)

```yaml
- name: APIRE Compliance Scan
  uses: apire/compliance-action@v1
  with:
    api-key: ${{ secrets.APIRE_KEY }}
    frameworks: "gdpr,owasp"
    fail-on-high: true
```

## Jira (Remediation)

Automatically create Jira tickets for compliance gaps.
- **Project**: COMPLIANCE
- **Issue Type**: Task
- **Labels**: `gdpr`, `auto-generated`

## Slack (Notifications)

Receive daily compliance summaries.
- "Your GDPR score dropped by 5% today."
- "New critical finding in repo `backend-api`."

## Cloud Providers (CSPM)

Connect your AWS account to scan for infrastructure compliance.
- **AWS Config**: Import rules.
- **Security Hub**: Sync findings.
