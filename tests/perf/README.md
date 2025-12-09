# Performance Tests

This directory contains performance testing scripts for the Apire AI Security Platform.

## Prerequisites

Install k6 for load testing:

### macOS

```bash
brew install k6
```

### Linux

```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### Windows

```powershell
choco install k6
```

Or download from: https://k6.io/docs/get-started/installation/

## Running Load Tests

### Login and Scanner Flow Test

This test simulates user registration, login, and scanner API usage.

**Start the backend server first:**

```bash
cd backend
npm run dev
```

**Run the load test (from project root):**

```bash
npm run perf:k6
```

**With custom backend URL:**

```bash
API_BASE_URL=http://localhost:4000 npm run perf:k6
```

## Test Configuration

The default test configuration (`k6-login-and-scan.js`):

- **Ramp-up**: 30 seconds to 10 virtual users
- **Sustained load**: 1 minute at 10 virtual users
- **Ramp-down**: 10 seconds to 0 users

### Performance Thresholds

- **95th percentile response time**: < 500ms
- **Error rate**: < 10%

## Understanding Results

After running the test, k6 will output metrics including:

- `http_req_duration`: Response time statistics (avg, min, max, p95, p99)
- `http_reqs`: Total number of HTTP requests
- `errors`: Custom error rate metric
- `vus`: Number of virtual users
- `iterations`: Total test iterations completed

### Example Output

```
✓ login status is 200
✓ login returns token
✓ scan status is 200
✓ scan returns result

http_req_duration..............: avg=45ms  min=20ms med=40ms max=150ms p(95)=120ms p(99)=145ms
http_reqs......................: 1200  20/s
errors.........................: 0.00% ✓ 0  ✗ 1200
```

## Customizing Tests

Edit `k6-login-and-scan.js` to:

- Change the number of virtual users (modify `target` values in `stages`)
- Adjust test duration
- Modify performance thresholds
- Add new test scenarios

## CI Integration

To run performance tests in CI:

```yaml
- name: Run k6 load test
  run: |
    npm run perf:k6
  env:
    API_BASE_URL: http://localhost:3000
```

**Note**: Ensure the backend service is running before executing the load test in CI.
