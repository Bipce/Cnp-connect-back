# 🚉 CNP Connect — Backend

![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-typed-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![MySQL](https://img.shields.io/badge/MySQL-database-4479A1?logo=mysql)
![JWT](https://img.shields.io/badge/JWT-auth-000000?logo=jsonwebtokens)

## 📖 Overview

CNP Connect is the backend application of a rail operations platform. It exposes a REST
API consumed by the frontend to manage users, authentication and alerts.

The API handles a complete authentication flow (sign in, token refresh, password reset),
role-based access for drivers, coordinators and supervisors, and the creation and
retrieval of prioritized alerts.

This project was developed collaboratively, with a focus on a modular NestJS
architecture, strong input validation and a secure, token-based authentication system.

---

## 🧰 Tech Stack

- NestJS 11 + TypeScript
- Prisma ORM + MySQL
- JWT access & refresh tokens (`@nestjs/jwt`)
- Argon2 (password hashing) + CryptoJS (encryption)
- class-validator / class-transformer (DTO validation)
- @nestjs-modules/mailer (transactional emails)
- Jest + Supertest (unit & e2e testing)

---

## 🚀 Quick Start

Install dependencies:

```bash
npm install
```

Set up the database (generate the Prisma client and run migrations):

```bash
npx prisma generate
npx prisma migrate dev
```

Run the development server:

```bash
npm run start:dev
```

Other available scripts:

```bash
npm run start        # Start the server
npm run start:prod   # Start from the compiled build (dist/)
npm run build        # Compile the project
npm run lint         # Run ESLint (with --fix)
npm run format       # Format with Prettier
npm run test         # Unit tests
npm run test:e2e     # End-to-end tests
npm run test:cov     # Test coverage
```

Seed the database with sample data:

```bash
npx prisma db seed
```

---

## 🔐 Environment Variables

Create a `.env` file at the root of the project (see `.env.example`):

```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
NODE_ENV=development        # development | production | test
PORT=3000
ACCESS_JWT_SECRET=your_access_token_secret
REFRESH_JWT_SECRET=your_refresh_token_secret
TOKEN_TYPE=Bearer           # Basic | Oauth | Bearer
CRYPTO_SECRET=your_crypto_secret
FRONTEND_URL=http://localhost:5173
```

---

## 🚀 Features

- Authentication with JWT access & refresh tokens
- Sign in with email and password
- Password reset flow via email (forgot / reset password)
- Secure session handling with HTTP cookies
- Role-based access control (Supervisor, Coordinator, Driver)
- User management (creation, listing, details, update)
- Alert management with priority levels and line filtering
- Global validation and centralized exception handling

---

## 🏗️ Project Structure

The project follows the modular NestJS architecture, with one module per domain.

```text
src/
│
├── auth/         # Authentication (controller, service, guards, DTOs)
├── user/         # User management (controller, service, DTOs)
├── alert/        # Alerts (controller, service, DTOs)
├── utils/        # Shared utilities
│   ├── enums/        # Shared enums
│   ├── filters/      # Global exception filters
│   ├── hash/         # Password hashing (Argon2)
│   ├── mail/         # Email module
│   └── seed/         # Database seeding
│
├── app.module.ts # Root module
└── main.ts       # Application entry point

prisma/           # Prisma schema and migrations
```

### Structure Overview

- **auth/** – Sign in, token refresh, password reset and route guards.
- **user/** – CRUD operations on user accounts.
- **alert/** – Creation and retrieval of alerts.
- **utils/** – Cross-cutting concerns: filters, hashing, mailing and seeding.
- **prisma/** – Database schema, client and migrations.

---

## 🔑 Authentication & Authorization

Authentication relies on JWT access tokens and refresh tokens.

- Passwords are hashed with **Argon2**; sensitive values are encrypted with **CryptoJS**.
- Refresh and reset-password tokens are persisted in the database (`Token` model).
- Login is handled with email and password, returning a short-lived access token and a
  refresh token.
- Route guards enforce authentication and role-based access:
  `access-token`, `refresh-token`, `coordinator` and `supervisor` guards.

Roles available: **Supervisor**, **Coordinator** and **Driver**.

---

## 📡 API Endpoints

All routes are prefixed with `/api`.

### Auth — `/api/auth`

| Method | Path               | Description                          |
| ------ | ------------------ | ------------------------------------ |
| GET    | `/me`              | Current authenticated user           |
| POST   | `/signin`          | Sign in with email and password      |
| POST   | `/refresh-token`   | Refresh the access token             |
| POST   | `/forgot-password` | Request a password reset email       |
| POST   | `/reset-password`  | Reset the password using a token     |
| POST   | `/signout`         | Sign out                             |

### Users — `/api/users`

| Method | Path    | Description          |
| ------ | ------- | -------------------- |
| POST   | `/`     | Create a user        |
| GET    | `/`     | List all users       |
| GET    | `/:id`  | Get a user by id     |
| PATCH  | `/:id`  | Update a user        |

### Alerts — `/api/alerts`

| Method | Path              | Description                  |
| ------ | ----------------- | ---------------------------- |
| POST   | `/`               | Create an alert              |
| GET    | `/`               | List alerts                  |
| GET    | `/:id`            | Get an alert by id           |
| GET    | `/lines/:lineId`  | List alerts for a given line |

---

## 🗄️ Data Model

The database is managed with Prisma (MySQL). Core entities include:

- **User** – Accounts with role, status and connection state.
- **Token** – Refresh and reset-password tokens.
- **Alert** – Alerts with content and priority, linked to users and lines.

The schema also models lines, trains, travels and a messaging domain
(conversations, messages, read receipts).

---

## 🧪 Testing

Tests are written with Jest and Supertest.

```bash
npm run test       # Unit tests
npm run test:e2e   # End-to-end tests
npm run test:cov   # Coverage
```

---

## 📦 Deployment

The project ships with Docker support and a GitLab CI pipeline:

- `dockerfile.dev` – Development image.
- `dockerfile.prod` – Production image.
- `.gitlab-ci.yml` – Continuous integration pipeline.

The application runs behind the global `/api` prefix, with CORS restricted to the
frontend URL and validation enabled globally.

---

## 🤝 Collaboration

This project was developed collaboratively, alongside the CNP Connect frontend, with
regular code reviews and technical discussions throughout the development.
