# CNP-Connect – Backend

## 📌 Project Overview

CNP-Connect is an internal web application designed for public transportation companies.  

This repository contains the **backend** of the application, developed with **NestJS** and **TypeScript**, using **Prisma** as the ORM for the relational database.

---

## 📦 Parent Repository

This project is part of: https://github.com/peter-francois/cnp-connect-resources

---

## 🔁 Repository Origin & DevOps

This repository is a **mirror of the original GitLab repository** for the CNP-Connect project. It therefore reflects the state of the code originally developed on GitLab.

### 🐳 Containerization

Dockerfiles are provided to containerize the backend, allowing reproducible execution in both local and production environments.

### 🔃 CI/CD (GitLab)

The project integrates a **GitLab CI/CD pipeline** (`.gitlab-ci.yml`) enabling:

- automatic application build,
- Docker image creation,
- automated testing of the generated image,
- pushing the image to the GitLab container registry.

---

## 🏗️ Backend Architecture

The backend follows a **modular NestJS architecture**, organized by business domain.

Each module generally contains:

- **Controller** → exposes HTTP endpoints  
- **Service** → contains business logic  
- **Repository / Prisma** → data access layer  
- **DTO** → validation and typing of incoming data  

### Main Modules

- **Auth** → authentication, token management, guards  
- **Users** → user and role management  
- **Alerts** → alert management  
- **Assignments** → assignment management  

---

## 🛠️ Tech Stack

| Tool            | Usage                     |
| --------------- | ------------------------- |
| **NestJS**       | Backend framework         |
| **TypeScript**   | Static typing             |
| **Prisma**       | ORM                       |
| **MySQL**        | Relational database       |
| **JWT**          | Authentication            |
| **class-validator** | DTO validation        |
| **Docker**       | Containerization          |

---

## 🔐 Backend Security

### Environment Variables

Sensitive variables are stored in a `.env` file (excluded from version control).

### CORS

CORS is configured to restrict which origins are allowed to call the API from a browser.

### Error Handling

- Use of custom HTTP exceptions  
- Global filter for Prisma errors to improve debugging  
- Detailed error messages in development, masked in production  

---

## 🔑 Authentication (JWT)

Authentication is based on **JSON Web Tokens (JWT)**.

### Access Token

- Short lifespan  
- Verified on each request via an Auth Guard  
- Contains only the user identifier (minimum claims principle)  

### Refresh Token

- Stored client-side in an `httpOnly` cookie  
- Stored in the database and linked to a session to support multi-device usage  
- Allows generating new tokens without requiring the user to log in again  

### TokenService

A dedicated service manages:

- token creation,  
- token validation,  
- extraction from headers and cookies.  

---

## 🌐 API Endpoints (General Principles)

The API follows REST conventions:

- `POST /auth/login` → authentication  
- `GET /users` → list of users  
- `GET /users/:id` → user details  
- `POST /alerts` → create an alert  
- `PATCH /assignments` → reassign an assignment  

---

## 📁 Project Structure (Simplified)
```
src/
│── app.module.ts
│
│── auth/
│ ├── auth.controller.ts
│ ├── auth.service.ts
│ ├── auth.guard.ts
│ └── token.service.ts
│
│── user/
│ ├── user.controller.ts
│ ├── user.service.ts
│ ├── user.repository.ts
│ └── dto/
│
│── alert/
│ ├── alert.controller.ts
│ ├── alert.service.ts
│
│── utils/
│ ├── exceptions/
│ └── filters/
│
│── main.ts
```

---

## ⚙️ Configuration

Make sure you have:

- Node.js installed  
- MySQL running locally or via Docker  

An `.env.example` file is provided as a configuration template.

To use it:

``` bash
cp .env.example .env
```
Then fill in the values according to your environment.

---

## 🚀 Run the project locally
Install dependencies:
``` bash
npm install
```

Generate Prisma client:
``` bash
npx prisma generate
```

Run the backend:
``` bash
npm run start:dev
```
By default: http://localhost:3000

---

## 🧪 Tests (Jest)
The project includes automated unit tests with Jest.

Commands:
``` bash
npm run test
npm run test:watch
```

---

## 📬 Contact
If you have any questions, suggestions, or would like to discuss the project, feel free to contact me:

Email: contact@peterfrancois.dev  
LinkedIn: https://www.linkedin.com/in/peterfrancois/  
GitHub: https://github.com/peter-francois/  

Feel free to open an issue or submit a pull request if you’d like to contribute to the project.
