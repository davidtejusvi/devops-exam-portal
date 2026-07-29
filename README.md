# DevOps Exam Portal

A full-stack exam platform for testing DevOps knowledge across 8 topics: Docker, Kubernetes, Terraform, AWS, Linux, Jenkins, Git, and DevOps principles.
app ui
<img width="1354" height="795" alt="Screenshot 2026-07-29 at 2 38 07 PM" src="https://github.com/user-attachments/assets/6b121a54-eea7-4f3c-9d17-f28357123083" />


## Stack

| Layer    | Tech                                |
|----------|-------------------------------------|
| Frontend | React 18 + Vite + TailwindCSS       |
| Backend  | Node.js + Express + Sequelize (ORM) |
| Database | MySQL 8                             |
| Auth     | JWT + bcrypt + Google OAuth 2.0     |
| Deploy   | Docker + docker-compose             |

## Quick Start (Docker)

```bash
# 1. Clone and enter the project
cd devops-exam-portal

# 2. Spin everything up
docker compose up --build

# 3. Open the app
open http://localhost:3000
```

Default admin credentials (seeded):
- Email: `admin@devopsportal.com`
- Password: `Admin@123`

> **Important:** Change the admin password and all secrets in `.env` files before deploying to production.

## Local Development

### Backend

```bash
cd backend
npm install
# Make sure MySQL is running locally or use docker for just the DB:
# docker compose up mysql -d
npm run dev     # nodemon on port 5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev     # Vite dev server on port 3000
```

## Project Structure

```
devops-exam-portal/
├── frontend/          # React + Vite SPA
│   └── src/
│       ├── api/       # Axios API helpers
│       ├── auth/      # ProtectedRoute
│       ├── components/ # Reusable UI (ExamRunner)
│       ├── context/   # AuthContext
│       ├── hooks/     # useExam, useResults
│       ├── layouts/   # AuthLayout, MainLayout
│       ├── pages/     # All page components
│       └── router/    # React Router config
├── backend/
│   ├── config/        # db, jwt, passport
│   ├── controllers/   # Business logic
│   ├── middleware/     # auth, upload, errorHandler
│   ├── models/        # Sequelize models
│   └── routes/        # Express routers
├── mysql/
│   ├── init.sql       # Schema creation
│   └── seed.sql       # Sample exams & questions
└── docker-compose.yml
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |
| GET | `/api/exams` | List exams |
| GET | `/api/exams/:slug` | Exam with questions |
| POST | `/api/exams/:slug/submit` | Submit answers |
| GET | `/api/results` | User results |
| GET | `/api/results/:id` | Single result |
| GET | `/api/users/profile` | Get profile |
| PUT | `/api/users/profile` | Update profile |
| GET | `/api/admin/stats` | Admin stats |
| GET | `/api/admin/users` | All users |
| POST | `/api/admin/exams` | Create exam |
| POST | `/api/admin/exams/:id/questions` | Add question |

## Adding More Questions

Use the Admin panel at `/admin/exams` to manage exams and questions through the UI, or insert directly into the seed SQL file.
