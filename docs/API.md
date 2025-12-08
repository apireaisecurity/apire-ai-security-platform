# API Reference

## Authentication

### Register
- **URL**: `/api/v1/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "name": "John Doe"
  }
  ```
- **Response**: `201 Created`

### Login
- **URL**: `/api/v1/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Response**: `200 OK` (returns JWT token)

### Get Current User
- **URL**: `/api/v1/auth/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`

## Scanner

### Scan Prompt
- **URL**: `/api/v1/scanner`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "prompt": "Text to scan",
    "checkType": "injection" // optional: 'injection' | 'pii' | 'toxicity'
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "isSafe": boolean,
    "flags": string[],
    "confidence": number,
    "timestamp": string
  }
  ```
