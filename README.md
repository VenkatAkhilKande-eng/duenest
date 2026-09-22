# 🪺 DueNest

A full-stack subscription and bill tracker for individuals and families — keep every recurring payment in one place and never miss a due date.

## Features
- 📅 Track subscriptions with due dates, amounts, and categories
- 👨‍👩‍👧 Family accounts with shared visibility and member management
- 🔔 In-app notifications for upcoming and overdue payments
- 🤝 Request/approve flow to join a family account
- 🔐 Email/password authentication with JWT

## Tech Stack
**Frontend:** React 19, Vite, Tailwind CSS, React Router, Axios
**Backend:** Node.js, Express, PostgreSQL (`pg`), JWT, bcrypt

## Project Structure

DueNest/
├── backend/ # Express API (routes, db connection)
└── frontend/ # React + Vite app


## Getting Started

### Backend
```bash
cd backend
npm install
# create a .env file — see below
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables (`backend/.env`)

PGHOST=
PGPORT=5432
PGDATABASE=
PGUSER=
PGPASSWORD=
JWT_SECRET=
PORT=4000


## API Overview
| Route | Description |
|---|---|
| `POST /api/auth/register` | Create a new user (personal or family account) |
| `POST /api/auth/login` | Authenticate and receive a JWT |
| `GET /api/accounts/:userId` | List accounts for a user |
| `GET /api/subscriptions/account/:accountId` | List subscriptions for an account |
| `POST /api/subscriptions/account/:accountId` | Add a subscription |
| `GET /api/notifications/:userId` | Get unread notifications |
| `POST /api/access-requests/:id/approve` | Approve a family join request |

## License
Private project