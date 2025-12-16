# TodoApp – Full Stack Task Management Application

A minimal full-stack task management application with user authentication and task CRUD functionality.

## Backend

Backend API for a simple Task Management application.

This service provides:
- User authentication (register & login)
- JWT-based authorization
- Task CRUD operations
- Task filtering by status and priority

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- JWT (Authentication & Authorization)
- bcrypt (Password hashing)

### Frontend
- React
- React Router
- Fetch API

---

## Folder Structure

todoApp/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── task.controller.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── task.routes.js
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
├── docs/
│   └── TodoApp_Postman_Collection.json
└── README.md

---

## Backend Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

## Environment Variables

### Create a .env file inside the backend folder:

```
PORT=8081
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

> Note: The actual `.env` file is not committed for security reasons.  
> Use `.env.example` as a reference.

## run the backend server

```bash
npm run dev 
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs by default on http://localhost:5173

## API Overview

# Authentication
	•	POST /api/auth/register – Register a new user
	•	POST /api/auth/login – Login and receive JWT token

# Tasks (Protected)

Authorization: Bearer <JWT_TOKEN>

        POST /api/tasks – Create a task
        GET /api/tasks – Get all tasks
	    GET /api/tasks?status=Pending&priority=High – Filter tasks
	    PUT /api/tasks/:id – Update a task
	    DELETE /api/tasks/:id – Delete a task

## API Documentation (Postman)

A Postman collection is included in the `docs/` folder:

- `docs/TodoApp_Postman_Collection.json`

The collection contains:
- User registration
- User login (auto-saves JWT token)
- Create, read, update, and delete tasks
- Task filtering APIs

Login request automatically stores the JWT token, which is reused for all protected task APIs.