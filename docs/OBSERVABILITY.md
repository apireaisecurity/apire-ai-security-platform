# Observability Guide

## Overview

The Apire AI Security Platform includes integrated observability through Prometheus and Grafana, providing real-time metrics, alerting, and visualization for all security tools.

## 🎯 Quick Start

### 1. Start Observability Stack

```bash
# Start Prometheus + Grafana
docker-compose -f docker-compose.observability.yml up -d

# Verify services are running
docker ps | grep apire
```

### 2. Access Dashboards

- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000 (username: `admin`, password: `admin`)

### 3. Configure Data Source in Grafana

1. Navigate to **Configuration** → **Data Sources** → **Add data source**
2. Select **Prometheus**
3. Set URL to `http://prometheus:9090`
4. Click **Save & Test**

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Grafana (Port 3000)                   │
│              Dashboards & Visualization Layer             │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│                 Prometheus (Port 9090)                    │
│               Metrics Collection & Storage                │
└─────────┬──────────┬──────────┬────────────┬─────────────┘
          │          │          │            │
          ▼          ▼          ▼            ▼
    ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
    │ Shield  │ │ RedTeam │ │Compliance│ │  Core   │
    │  :3001  │ │  :3005  │ │  :3003  │ │  :3000  │
    └─────────┘ └─────────┘ └─────────┘ └─────────┘
         Expose /metrics endpoints (future implementation)
```

---

## Metrics Exported by Each Service

### 🛡️ Prompt Shield (Port 3001)

**Endpoint**: `GET /metrics` *(to be implemented)*

| Metric Name | Type | Description | Labels |
|-------------|------|-------------|--------|
| `shield_tests_total` | Counter | Total number of prompt tests executed | `risk_level`, `status` |
| `shield_test_duration_seconds` | Histogram | Test execution duration | `endpoint` |
| `shield_injections_detected_total` | Counter | Prompt injection attacks detected | `injection_type` |
| `shield_jailbreaks_detected_total` | Counter | Jailbreak attempts detected | `technique` |
| `shield_api_requests_total` | Counter | Total API requests | `method`, `endpoint`, `status` |
| `shield_api_errors_total` | Counter | API error responses | `error_type`, `endpoint` |
| `shield_cache_hits_total` | Counter | Redis cache hits | `cache_type` |
| `shield_cache_misses_total` | Counter | Redis cache misses | `cache_type` |

**Example PromQL Queries**:
```promql
# Request rate per minute
rate(shield_api_requests_total[1m])

# Error rate
rate(shield_api_errors_total[5m]) / rate(shield_api_requests_total[5m])

# 95th percentile latency
histogram_quantile(0.95, rate(shield_test_duration_seconds_bucket[5m]))

# Injection detection rate
rate(shield_injections_detected_total[5m])
```

---

### ⚔️ RedTeam Kit (Port 3005)

**Endpoint**: `GET /metrics` *(to be implemented)*

| Metric Name | Type | Description | Labels |
|-------------|------|-------------|--------|
| `redteam_scenarios_total` | Counter | Total test scenarios executed | `scenario_type`, `status` |
| `redteam_scenario_duration_seconds` | Histogram | Scenario execution time | `scenario_type` |
| `redteam_vulnerabilities_found_total` | Counter | Vulnerabilities discovered | `severity`, `category` |
| `redteam_api_requests_total` | Counter | Total API requests | `method`, `endpoint`, `status` |
| `redteam_queue_depth` | Gauge | RabbitMQ job queue depth | `queue_name` |
| `redteam_active_jobs` | Gauge | Currently running jobs | `job_type` |
| `redteam_job_failures_total` | Counter | Failed job executions | `job_type`, `error` |

**Example PromQL Queries**:
```promql
# Active concurrent jobs
sum(redteam_active_jobs)

# Job failure rate
rate(redteam_job_failures_total[5m])

# Average scenario duration
rate(redteam_scenario_duration_seconds_sum[5m]) / rate(redteam_scenario_duration_seconds_count[5m])

# Vulnerabilities by severity
sum(redteam_vulnerabilities_found_total) by (severity)
```

---

### ✅ Compliance Checker (Port 3003)

**Endpoint**: `GET /metrics` *(to be implemented)*

| Metric Name | Type | Description | Labels |
|-------------|------|-------------|--------|
| `compliance_scans_total` | Counter | Total compliance scans executed | `framework`, `status` |
| `compliance_scan_duration_seconds` | Histogram | Scan execution time | `framework` |
| `compliance_violations_total` | Counter | Compliance violations found | `framework`, `severity`, `rule_id` |
| `compliance_rules_evaluated_total` | Counter | Total rules evaluated | `framework` |
| `compliance_api_requests_total` | Counter | Total API requests | `method`, `endpoint`, `status` |
| `compliance_elasticsearch_queries_total` | Counter | Elasticsearch queries executed | `query_type` |
| `compliance_elasticsearch_latency_seconds` | Histogram | Elasticsearch query latency | - |

**Example PromQL Queries**:
```promql
# Scans per minute by framework
sum(rate(compliance_scans_total[1m])) by (framework)

# Violation distribution
sum(compliance_violations_total) by (framework, severity)

# Elasticsearch query performance
histogram_quantile(0.99, rate(compliance_elasticsearch_latency_seconds_bucket[5m]))
```

---

## Prometheus Configuration

### Current Configuration (`config/prometheus.yml`)

```yaml
global:
  scrape_interval: 15s      # Scrape metrics every 15 seconds
  evaluation_interval: 15s  # Evaluate rules every 15 seconds

scrape_configs:
  # Prometheus self-monitoring
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # Apire Platform Services
  - job_name: 'apire-services'
    static_configs:
      - targets: 
        - 'host.docker.internal:3001'  # Prompt Shield
        - 'host.docker.internal:3003'  # Compliance Checker
        - 'host.docker.internal:3005'  # RedTeam Kit
    metrics_path: '/metrics'
    scrape_interval: 10s
```

### Adding Custom Scrape Targets

```yaml
scrape_configs:
  # Add database monitoring
  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

  # Add Redis monitoring
  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']

  # Add node-level metrics
  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']
```

---

## Alerting Rules

### Create Alert Rules (`config/prometheus-rules.yml`)

```yaml
groups:
  - name: apire_alerts
    interval: 30s
    rules:
      # High error rate
      - alert: HighErrorRate
        expr: |
          sum(rate(shield_api_errors_total[5m])) / sum(rate(shield_api_requests_total[5m])) > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High error rate detected in Prompt Shield"
          description: "Error rate is {{ $value | humanizePercentage }} (threshold: 5%)"

      # Service down
      - alert: ServiceDown
        expr: up{job="apire-services"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Apire service is down"
          description: "{{ $labels.instance }} has been down for more than 1 minute"

      # High injection detection rate
      - alert: HighInjectionAttempts
        expr: rate(shield_injections_detected_total[5m]) > 10
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "High rate of injection attempts detected"
          description: "Detecting {{ $value }} injection attempts per second"

      # High vulnerability discovery
      - alert: CriticalVulnerabilities
        expr: |
          sum(increase(redteam_vulnerabilities_found_total{severity="critical"}[1h])) > 5
        labels:
          severity: critical
        annotations:
          summary: "Multiple critical vulnerabilities discovered"
          description: "Found {{ $value }} critical vulnerabilities in the last hour"

      # Compliance violations
      - alert: ComplianceViolations
        expr: |
          sum(increase(compliance_violations_total{severity="high"}[1h])) > 10
        labels:
          severity: warning
        annotations:
          summary: "High number of compliance violations"
          description: "Detected {{ $value }} high-severity violations in the last hour"
```

### Enable Alert Rules in Prometheus

Update `config/prometheus.yml`:
```yaml
rule_files:
  - '/etc/prometheus/prometheus-rules.yml'

alerting:
  alertmanagers:
    - static_configs:
      - targets: ['alertmanager:9093']
```

---

## Grafana Dashboards

### Dashboard 1: Platform Overview

**Panels**:
- Total API requests per service (Time series)
- Error rate by service (Bar gauge)
- 95th percentile latency (Graph)
- Active users (Stat)

**Example JSON** (`dashboards/platform-overview.json`):
```json
{
  "dashboard": {
    "title": "Apire Platform Overview",
    "panels": [
      {
        "title": "API Requests by Service",
        "targets": [
          {
            "expr": "sum(rate(shield_api_requests_total[5m])) by (service)",
            "legendFormat": "{{ service }}"
          }
        ],
        "type": "timeseries"
      },
      {
        "title": "Error Rate",
        "targets": [
          {
            "expr": "sum(rate(shield_api_errors_total[5m])) / sum(rate(shield_api_requests_total[5m]))",
            "legendFormat": "Error Rate"
          }
        ],
        "type": "gauge",
        "options": {
          "reduceOptions": { "values": false, "calcs": ["lastNotNull"] }
        }
      }
    ]
  }
}
```

### Dashboard 2: Security Insights

**Panels**:
- Injection attempts over time
- Jailbreak techniques distribution
- RedTeam vulnerabilities by severity
- Compliance violations heatmap

### Dashboard 3: Performance Monitoring

**Panels**:
- Request latency (P50, P95, P99)
- Database query performance
- Cache hit/miss ratio
- Queue depth (RedTeam Kit)

### Import Pre-built Dashboards

```bash
# Copy dashboard JSON to Grafana container
docker cp dashboards/platform-overview.json apire-grafana:/var/lib/grafana/dashboards/

# Restart Grafana to load dashboard
docker restart apire-grafana
```

---

## Implementing Metrics in Services

### Adding Prometheus Client Library

**For TypeScript/Express backends**:
```bash
npm install prom-client --save
```

**Example implementation** (`src/metrics.ts`):
```typescript
import { Registry, Counter, Histogram, collectDefaultMetrics } from 'prom-client';

const register = new Registry();

// Collect default metrics (CPU, memory, etc.)
collectDefaultMetrics({ register });

// Custom metrics
export const apiRequestsTotal = new Counter({
  name: 'shield_api_requests_total',
  help: 'Total number of API requests',
  labelNames: ['method', 'endpoint', 'status'],
  registers: [register]
});

export const testDuration = new Histogram({
  name: 'shield_test_duration_seconds',
  help: 'Test execution duration in seconds',
  labelNames: ['endpoint'],
  buckets: [0.1, 0.5, 1, 2, 5],
  registers: [register]
});

export const injectionsDetected = new Counter({
  name: 'shield_injections_detected_total',
  help: 'Number of injection attacks detected',
  labelNames: ['injection_type'],
  registers: [register]
});

export { register };
```

**Expose metrics endpoint** (`src/app.ts`):
```typescript
import express from 'express';
import { register, apiRequestsTotal } from './metrics';

const app = express();

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Middleware to track requests
app.use((req, res, next) => {
  res.on('finish', () => {
    apiRequestsTotal.inc({
      method: req.method,
      endpoint: req.route?.path || req.path,
      status: res.statusCode.toString()
    });
  });
  next();
});
```

---

## Production Best Practices

### 1. Data Retention

**Configure retention in Prometheus**:
```yaml
# docker-compose.observability.yml
services:
  prometheus:
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.retention.time=30d'  # Keep 30 days of data
      - '--storage.tsdb.retention.size=10GB'  # Max 10GB storage
```

### 2. Persistent Storage

**Add volumes for data persistence**:
```yaml
services:
  prometheus:
    volumes:
      - prometheus-data:/prometheus
  
  grafana:
    volumes:
      - grafana-data:/var/lib/grafana

volumes:
  prometheus-data:
  grafana-data:
```

### 3. Authentication & Security

**Enable Grafana authentication**:
```yaml
services:
  grafana:
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
      - GF_AUTH_ANONYMOUS_ENABLED=false
      - GF_AUTH_DISABLE_LOGIN_FORM=false
      - GF_USERS_ALLOW_SIGN_UP=false
```

**Secure Prometheus with basic auth** (nginx/reverse proxy):
```nginx
location /prometheus/ {
    auth_basic "Metrics Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://prometheus:9090/;
}
```

### 4. High Availability

For production, deploy multiple Prometheus instances with Thanos for long-term storage.

---

## Troubleshooting

### Issue: "No data in Grafana"

**Symptoms**: Dashboards show "No data"

**Solutions**:
1. Check Prometheus targets: http://localhost:9090/targets
2. Verify services expose `/metrics` endpoints
3. Check Prometheus logs: `docker logs apire-prometheus`
4. Test metric scraping: `curl http://localhost:3001/metrics`

### Issue: "Prometheus can't reach services"

**Symptoms**: Targets show as "DOWN" in Prometheus

**Solutions**:
1. Use `host.docker.internal` instead of `localhost` in Docker
2. Ensure services are on the same Docker network
3. Check firewall rules blocking port 3001/3003/3005

### Issue: "High cardinality warnings"

**Symptoms**: Prometheus logs show cardinality warnings

**Solutions**:
1. Limit label values (avoid user IDs, timestamps as labels)
2. Use label aggregation in queries
3. Reduce scrape frequency for high-volume metrics

---

## Example Kubernetes Deployment

### ServiceMonitor for Prometheus Operator

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: apire-shield
  namespace: apire-platform
spec:
  selector:
    matchLabels:
      app: shield-api
  endpoints:
  - port: http
    path: /metrics
    interval: 30s
```

### Grafana Dashboard ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-dashboard-apire
  namespace: monitoring
  labels:
    grafana_dashboard: "1"
data:
  apire-platform.json: |
    {{ dashboard JSON here }}
```

---

## Next Steps

1. **Implement `/metrics` endpoints** in all services (currently not exposed)
2. **Create Grafana dashboards** based on the metrics above
3. **Set up Alertmanager** for notification routing (email, Slack, PagerDuty)
4. **Add distributed tracing** with Jaeger or Zipkin
5. **Integrate log aggregation** with ELK stack or Loki

---

## Additional Resources

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [PromQL Query Examples](https://prometheus.io/docs/prometheus/latest/querying/examples/)
- [prom-client (Node.js)](https://github.com/siimon/prom-client)
- [Best Practices for Instrumentation](https://prometheus.io/docs/practices/instrumentation/)
