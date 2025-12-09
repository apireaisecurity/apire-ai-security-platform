# Contributing to APIRE RedTeam Kit

## Tech Stack

- **Backend**: NestJS, TypeScript, GraphQL, Mongoose.
- **Frontend**: Next.js 14, React, Apollo Client, Shadcn UI.

## Setup

1.  `npm install` in root.
2.  `docker-compose up -d mongo rabbitmq`
3.  `npm run start:dev` (starts both frontend and backend in watch mode).

## Directory Structure

- `apps/api`: NestJS backend.
- `apps/web`: Next.js frontend.
- `apps/worker`: Attack execution worker.
- `libs/shared`: Shared DTOs and interfaces.

## Guidelines

- Use **Prettier** for formatting.
- Write **Unit Tests** for all services.
- Write **E2E Tests** for critical flows.
- Follow **Conventional Commits**.
