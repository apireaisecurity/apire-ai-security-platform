# Reverse Proxy Configuration Guide

## Overview

This guide provides production-ready reverse proxy configurations for the Apire AI Security Platform using nginx, Traefik, and Caddy. A reverse proxy provides SSL termination, load balancing, rate limiting, and unified routing for all three security tools.

---

## Why Use a Reverse Proxy?

### Benefits

✅ **SSL/TLS Termination**: Centralized HTTPS certificate management  
✅ **Unified Domain**: Single entry point (`https://api.apire.example.com`)  
✅ **Load Balancing**: Distribute traffic across multiple instances  
✅ **Rate Limiting**: Protect APIs from abuse  
✅ **Caching**: Reduce backend load for static content  
✅ **Security Headers**: HSTS, CSP, X-Frame-Options  
✅ **Access Logs**: Centralized logging for all services  

---

## Architecture Pattern

```
┌──────────────────────────────────────────────────────────┐
│                     Internet (HTTPS)                     │
└───────────────────────────┬──────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────┐
│              Reverse Proxy (nginx/Traefik/Caddy)         │
│                    Port 443 (HTTPS)                       │
│              SSL Certificate (Let's Encrypt)              │
└──────┬────────────┬────────────┬──────────────┬──────────┘
       │            │            │              │
       ▼            ▼            ▼              ▼
  ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌────────────┐
  │ Shield  │ │ RedTeam │ │Compliance│ │  Frontend  │
  │  :3001  │ │  :3005  │ │  :3003   │ │   :5173    │
  └─────────┘ └─────────┘ └──────────┘ └────────────┘
```

**URL routing**:
- `https://api.apire.example.com/shield/*` → Prompt Shield API (3001)
- `https://api.apire.example.com/redteam/*` → RedTeam Kit API (3005)
- `https://api.apire.example.com/compliance/*` → Compliance Checker API (3003)
- `https://apire.example.com/*` → Frontend Dashboard (5173)

---

## 🔧 nginx Configuration

### Installation

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx

# macOS
brew install nginx

# CentOS/RHEL
sudo yum install nginx certbot python3-certbot-nginx
```

### Complete Configuration (`/etc/nginx/sites-available/apire`)

```nginx
# Upstream definitions (backend services)
upstream shield_api {
    least_conn;  # Load balancing algorithm
    server localhost:3001 max_fails=3 fail_timeout=30s;
    # Add more instances for load balancing:
    # server localhost:3011 max_fails=3 fail_timeout=30s;
    # server localhost:3021 max_fails=3 fail_timeout=30s;
}

upstream redteam_api {
    server localhost:3005 max_fails=3 fail_timeout=30s;
}

upstream compliance_api {
    server localhost:3003 max_fails=3 fail_timeout=30s;
}

upstream frontend {
    server localhost:5173;
}

# Rate limiting zones
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=frontend_limit:10m rate=50r/s;

# Connection limiting
limit_conn_zone $binary_remote_addr zone=conn_limit:10m;

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name api.apire.example.com apire.example.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# API Gateway (api.apire.example.com)
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.apire.example.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/api.apire.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.apire.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Access Logs
    access_log /var/log/nginx/apire_api_access.log;
    error_log /var/log/nginx/apire_api_error.log;

    # Max request body size
    client_max_body_size 10M;

    # Timeouts
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;

    # Prompt Shield API
    location /shield/ {
        limit_req zone=api_limit burst=20 nodelay;
        limit_conn conn_limit 10;

        rewrite ^/shield/(.*) /$1 break;
        proxy_pass http://shield_api;
        proxy_http_version 1.1;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Request-ID $request_id;

        # CORS headers (if needed)
        add_header Access-Control-Allow-Origin "https://apire.example.com" always;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Authorization, Content-Type" always;

        # Handle preflight OPTIONS requests
        if ($request_method = OPTIONS) {
            return 204;
        }
    }

    # RedTeam Kit API
    location /redteam/ {
        limit_req zone=api_limit burst=5 nodelay;  # Stricter limit (heavy operations)
        limit_conn conn_limit 5;

        rewrite ^/redteam/(.*) /$1 break;
        proxy_pass http://redteam_api;
        proxy_http_version 1.1;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Long timeout for job execution
        proxy_read_timeout 300s;
    }

    # Compliance Checker API
    location /compliance/ {
        limit_req zone=api_limit burst=15 nodelay;
        limit_conn conn_limit 10;

        rewrite ^/compliance/(.*) /$1 break;
        proxy_pass http://compliance_api;
        proxy_http_version 1.1;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Health check endpoint (no rate limiting)
    location /health {
        access_log off;
        return 200 "OK";
        add_header Content-Type text/plain;
    }

    # Metrics endpoint (restricted to internal IPs)
    location /metrics {
        allow 10.0.0.0/8;      # Internal network
        allow 172.16.0.0/12;   # Docker networks
        allow 192.168.0.0/16;  # Private networks
        deny all;

        proxy_pass http://localhost:9090/metrics;
    }
}

# Frontend Application (apire.example.com)
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name apire.example.com;

    # SSL Configuration (reuse from above)
    ssl_certificate /etc/letsencrypt/live/apire.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/apire.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    access_log /var/log/nginx/apire_frontend_access.log;
    error_log /var/log/nginx/apire_frontend_error.log;

    location / {
        limit_req zone=frontend_limit burst=100 nodelay;

        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support (for Vite HMR in dev)
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://frontend;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Enable Configuration

```bash
# Test configuration
sudo nginx -t

# Create symlink to enable site
sudo ln -s /etc/nginx/sites-available/apire /etc/nginx/sites-enabled/

# Reload nginx
sudo systemctl reload nginx

# Enable auto-start
sudo systemctl enable nginx
```

### SSL Certificate with Let's Encrypt

```bash
# Obtain certificate
sudo certbot --nginx -d api.apire.example.com -d apire.example.com

# Auto-renewal (cron job)
sudo certbot renew --dry-run

# Add to crontab
0 3 * * * /usr/bin/certbot renew --quiet --post-hook "systemctl reload nginx"
```

---

## 🚀 Traefik Configuration (Docker-Friendly)

### Why Traefik?

- **Automatic SSL**: Built-in Let's Encrypt integration
- **Service Discovery**: Auto-detects Docker containers
- **Dynamic Configuration**: No reload needed

### docker-compose.traefik.yml

```yaml
version: '3.8'

services:
  traefik:
    image: traefik:v2.10
    container_name: apire-traefik
    restart: unless-stopped
    command:
      # Enable Docker provider
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      
      # Entry points
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      
      # HTTP to HTTPS redirect
      - "--entrypoints.web.http.redirections.entrypoint.to=websecure"
      - "--entrypoints.web.http.redirections.entrypoint.scheme=https"
      
      # Let's Encrypt
      - "--certificatesresolvers.letsencrypt.acme.email=admin@apire.example.com"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
      
      # Dashboard (optional)
      - "--api.dashboard=true"
      
      # Logging
      - "--log.level=INFO"
      - "--accesslog=true"
    
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"  # Traefik dashboard
    
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - traefik-certificates:/letsencrypt
    
    networks:
      - apire-network

  # Prompt Shield API
  shield-api:
    image: ghcr.io/apire/shield-api:latest
    container_name: shield-api
    restart: unless-stopped
    environment:
      - PORT=3001
      - NODE_ENV=production
    labels:
      - "traefik.enable=true"
      
      # Router configuration
      - "traefik.http.routers.shield.rule=Host(`api.apire.example.com`) && PathPrefix(`/shield`)"
      - "traefik.http.routers.shield.entrypoints=websecure"
      - "traefik.http.routers.shield.tls.certresolver=letsencrypt"
      
      # Strip /shield prefix
      - "traefik.http.middlewares.shield-stripprefix.stripprefix.prefixes=/shield"
      - "traefik.http.routers.shield.middlewares=shield-stripprefix,shield-ratelimit"
      
      # Rate limiting (10 req/s per IP)
      - "traefik.http.middlewares.shield-ratelimit.ratelimit.average=10"
      - "traefik.http.middlewares.shield-ratelimit.ratelimit.burst=20"
      
      # Service port
      - "traefik.http.services.shield.loadbalancer.server.port=3001"
    
    networks:
      - apire-network

  # RedTeam Kit API
  redteam-api:
    image: ghcr.io/apire/redteam-api:latest
    container_name: redteam-api
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.redteam.rule=Host(`api.apire.example.com`) && PathPrefix(`/redteam`)"
      - "traefik.http.routers.redteam.entrypoints=websecure"
      - "traefik.http.routers.redteam.tls.certresolver=letsencrypt"
      - "traefik.http.middlewares.redteam-stripprefix.stripprefix.prefixes=/redteam"
      - "traefik.http.routers.redteam.middlewares=redteam-stripprefix,redteam-ratelimit"
      - "traefik.http.middlewares.redteam-ratelimit.ratelimit.average=5"  # Stricter
      - "traefik.http.services.redteam.loadbalancer.server.port=3005"
    networks:
      - apire-network

  # Compliance Checker API
  compliance-api:
    image: ghcr.io/apire/compliance-api:latest
    container_name: compliance-api
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.compliance.rule=Host(`api.apire.example.com`) && PathPrefix(`/compliance`)"
      - "traefik.http.routers.compliance.entrypoints=websecure"
      - "traefik.http.routers.compliance.tls.certresolver=letsencrypt"
      - "traefik.http.middlewares.compliance-stripprefix.stripprefix.prefixes=/compliance"
      - "traefik.http.routers.compliance.middlewares=compliance-stripprefix"
      - "traefik.http.services.compliance.loadbalancer.server.port=3003"
    networks:
      - apire-network

  # Frontend
  frontend:
    image: ghcr.io/apire/frontend:latest
    container_name: apire-frontend
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.frontend.rule=Host(`apire.example.com`)"
      - "traefik.http.routers.frontend.entrypoints=websecure"
      - "traefik.http.routers.frontend.tls.certresolver=letsencrypt"
      - "traefik.http.services.frontend.loadbalancer.server.port=5173"
    networks:
      - apire-network

networks:
  apire-network:
    driver: bridge

volumes:
  traefik-certificates:
```

### Start Traefik

```bash
docker-compose -f docker-compose.traefik.yml up -d

# Check logs
docker logs -f apire-traefik

# Access Traefik dashboard
open http://localhost:8080/dashboard/
```

---

## ⚡ Caddy Configuration (Simplest Option)

### Why Caddy?

- **Automatic HTTPS**: Zero-config SSL with Let's Encrypt
- **Simple Syntax**: Human-readable configuration
- **Modern Defaults**: HTTP/2, HTTPS redirects built-in

### Caddyfile

```caddy
# API Gateway
api.apire.example.com {
    # Automatic HTTPS with Let's Encrypt
    
    # Prompt Shield
    handle_path /shield/* {
        reverse_proxy localhost:3001 {
            header_up X-Real-IP {remote_host}
            header_up X-Forwarded-For {remote_host}
        }
    }
    
    # RedTeam Kit
    handle_path /redteam/* {
        reverse_proxy localhost:3005 {
            header_up X-Real-IP {remote_host}
        }
    }
    
    # Compliance Checker
    handle_path /compliance/* {
        reverse_proxy localhost:3003 {
            header_up X-Real-IP {remote_host}
        }
    }
    
    # Health check
    handle /health {
        respond "OK" 200
    }
    
    # Security headers
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        X-XSS-Protection "1; mode=block"
    }
    
    # Access logging
    log {
        output file /var/log/caddy/apire_api.log
        format json
    }
}

# Frontend
apire.example.com {
    reverse_proxy localhost:5173
    
    # Cache static assets
    @static {
        path *.js *.css *.png *.jpg *.jpeg *.gif *.ico *.svg
    }
    header @static Cache-Control "public, max-age=31536000"
    
    log {
        output file /var/log/caddy/apire_frontend.log
    }
}
```

### Run Caddy

```bash
# Install Caddy
# macOS
brew install caddy

# Ubuntu/Debian
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/caddy-stable-archive-keyring.gpg] https://dl.cloudsmith.io/public/caddy/stable/deb/debian any-version main" | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# Start Caddy
sudo caddy start --config /etc/caddy/Caddyfile

# Reload configuration
sudo caddy reload --config /etc/caddy/Caddyfile
```

---

## Load Balancing (Multiple Instances)

### nginx Load Balancing

```nginx
upstream shield_api {
    least_conn;  # Algorithm: least_conn, ip_hash, round_robin (default)
    
    server 10.0.1.10:3001 weight=3 max_fails=3 fail_timeout=30s;
    server 10.0.1.11:3001 weight=2 max_fails=3 fail_timeout=30s;
    server 10.0.1.12:3001 weight=1 max_fails=3 fail_timeout=30s backup;  # Backup server
    
    # Health check (nginx Plus only)
    # health_check interval=10s fails=3 passes=2;
}
```

### Traefik Load Balancing

```yaml
labels:
  # Multiple service instances
  - "traefik.http.services.shield.loadbalancer.servers[0].url=http://shield-api-1:3001"
  - "traefik.http.services.shield.loadbalancer.servers[1].url=http://shield-api-2:3001"
  - "traefik.http.services.shield.loadbalancer.servers[2].url=http://shield-api-3:3001"
  
  # Health check
  - "traefik.http.services.shield.loadbalancer.healthcheck.path=/health"
  - "traefik.http.services.shield.loadbalancer.healthcheck.interval=10s"
  - "traefik.http.services.shield.loadbalancer.healthcheck.timeout=3s"
```

---

## Caching Strategy

### nginx Caching (API Responses)

```nginx
# Define cache zone
proxy_cache_path /var/cache/nginx/apire levels=1:2 keys_zone=apire_cache:10m max_size=1g inactive=60m use_temp_path=off;

location /shield/ {
    proxy_pass http://shield_api;
    
    # Enable caching for GET requests
    proxy_cache apire_cache;
    proxy_cache_methods GET HEAD;
    proxy_cache_key "$scheme$request_method$host$request_uri";
    proxy_cache_valid 200 5m;  # Cache successful responses for 5 minutes
    proxy_cache_valid 404 1m;  # Cache 404s for 1 minute
    proxy_cache_bypass $http_cache_control;  # Respect Cache-Control header
    
    add_header X-Cache-Status $upstream_cache_status;  # Show HIT/MISS in response
}
```

---

## Security Best Practices

### 1. IP Whitelisting (Admin Endpoints)

**nginx**:
```nginx
location /admin/ {
    allow 203.0.113.0/24;   # Your office IP range
    allow 198.51.100.42;    # Specific admin IP
    deny all;
    
    proxy_pass http://backend;
}
```

### 2. Basic Authentication

**nginx**:
```bash
# Create password file
sudo htpasswd -c /etc/nginx/.htpasswd admin

# Add to nginx config
location /metrics {
    auth_basic "Metrics Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://prometheus:9090;
}
```

### 3. DDoS Protection

**nginx**:
```nginx
# Connection limiting
limit_conn_zone $binary_remote_addr zone=conn_limit:10m;
limit_conn conn_limit 10;

# Request rate limiting
limit_req_zone $binary_remote_addr zone=req_limit:10m rate=10r/s;
limit_req zone=req_limit burst=20 nodelay;

# Return 429 Too Many Requests
limit_req_status 429;
limit_conn_status 429;
```

---

## Monitoring & Logging

### nginx Access Logs (JSON Format)

```nginx
log_format json_combined escape=json
  '{'
    '"time_local":"$time_local",'
    '"remote_addr":"$remote_addr",'
    '"request":"$request",'
    '"status": "$status",'
    '"body_bytes_sent":"$body_bytes_sent",'
    '"request_time":"$request_time",'
    '"http_referrer":"$http_referer",'
    '"http_user_agent":"$http_user_agent"'
  '}';

access_log /var/log/nginx/access.log json_combined;
```

### Prometheus Monitoring (nginx-exporter)

```yaml
services:
  nginx-exporter:
    image: nginx/nginx-prometheus-exporter:latest
    command:
      - -nginx.scrape-uri=http://nginx:80/stub_status
    ports:
      - "9113:9113"
```

---

## Troubleshooting

### Issue: 502 Bad Gateway

**Causes**:
- Backend service not running
- Firewall blocking connection
- Incorrect upstream port

**Solutions**:
```bash
# Check backend service
curl http://localhost:3001/health

# Check nginx error logs
sudo tail -f /var/log/nginx/error.log

# Test upstream connectivity
sudo nginx -t
```

### Issue: SSL Certificate Error

**Causes**:
- Certificate not renewed
- Incorrect certificate path
- Let's Encrypt rate limit

**Solutions**:
```bash
# Check certificate expiry
sudo certbot certificates

# Manually renew
sudo certbot renew --force-renewal

# Check nginx SSL config
sudo nginx -t
```

---

## Additional Resources

- [nginx Documentation](https://nginx.org/en/docs/)
- [Traefik Documentation](https://doc.traefik.io/traefik/)
- [Caddy Documentation](https://caddyserver.com/docs/)
- [Let's Encrypt Rate Limits](https://letsencrypt.org/docs/rate-limits/)
