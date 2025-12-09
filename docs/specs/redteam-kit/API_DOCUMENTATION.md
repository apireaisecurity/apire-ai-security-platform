# API Documentation: APIRE RedTeam Kit

We provide both GraphQL and REST APIs.

## GraphQL API (Preferred)

Endpoint: `/graphql`
Playground: `/graphql` (in browser)

### Queries

```graphql
query GetScenarios {
  scenarios {
    id
    name
    category
    difficulty
  }
}

query GetCampaign($id: ID!) {
  campaign(id: $id) {
    status
    progress
    results {
      success
      score
    }
  }
}
```

### Mutations

```graphql
mutation LaunchAttack($targetId: ID!, $scenarioId: ID!) {
  launchAttack(input: { targetId: $targetId, scenarioId: $scenarioId }) {
    jobId
    status
  }
}
```

## REST API

Endpoint: `/api/v1`

- `GET /scenarios`: List scenarios
- `POST /campaigns`: Create a new campaign
- `GET /campaigns/:id/report`: Download PDF report

## Authentication

Headers:
`Authorization: Bearer <JWT_TOKEN>`
`X-API-Key: <API_KEY>` (for CI/CD)
