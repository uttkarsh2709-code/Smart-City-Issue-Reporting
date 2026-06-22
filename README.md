# Smart City Issue Reporting System

A full-stack starter project for reporting and tracking civic infrastructure issues.

## Tech Stack

- Frontend: React 18.2.0, Material UI 5.15.0, React Router 6.20.0, Axios 1.6.2
- Backend: Spring Boot 3.2.0, Java 17+, Spring Security + JWT (io.jsonwebtoken 0.11.5), Spring Data JPA
- Build Tool: Maven
- Database: MySQL 8+

## Project Structure

- backend: Spring Boot API
- frontend: React app (Vite)

## Backend Setup

1. Ensure MySQL 8+ is running.
2. Database and credentials are configured in backend/src/main/resources/application.yml.
3. Run backend (persistent MySQL storage):

```bash
cd backend
mvn spring-boot:run
```

Optional temporary mode (H2 in-memory):

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=h2
```

Default seeded admin account:

- Email: admin@smartcity.com
- Password: Admin@123

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on http://localhost:5173 and calls backend at http://localhost:8080.

## Implemented Features

Citizen:
- Registration and login
- Report issues with title/description/category/image URL
- GPS-based location capture
- View own issues with status updates
- View notifications
- Submit feedback for resolved issues (API)

Admin:
- Login with admin role
- View all reported issues
- Assign department/officer
- Update issue status with timeline comments
- View analytics and performance summary

## Core API Endpoints

- POST /api/auth/register
- POST /api/auth/login
- POST /api/citizen/issues
- GET /api/citizen/issues
- GET /api/citizen/issues/{issueId}/timeline
- GET /api/citizen/notifications
- POST /api/citizen/issues/{issueId}/feedback
- GET /api/admin/issues
- PATCH /api/admin/issues/{issueId}/status
- GET /api/admin/analytics
