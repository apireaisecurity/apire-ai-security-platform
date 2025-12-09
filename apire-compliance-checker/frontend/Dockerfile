# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine

# Run as non-root (nginxinc/nginx-unprivileged is better but sticking to alpine for now requires config tweaks)
# For simplicity in this demo, we'll keep root for Nginx on port 80, 
# but in a real hardened env, we'd use nginx-unprivileged and port > 1024.

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
