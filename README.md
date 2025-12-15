# todoApp
minimal todo app.

# TodoApp Backend

Backend API for a simple Task Management application.

This service provides:
- User authentication (register & login)
- JWT-based authorization
- Task CRUD operations
- Task filtering by status and priority

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- JWT (Authentication)
- bcrypt (Password hashing)

---

## Folder Structure

backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── task.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── task.routes.js
│   └── app.js
├── server.js
├── .env
├── package.json
└── README.md

---

## Backend Setup

### 1. Install dependencies

cd backend
npm install

## Environment Variables

### Create a .env file inside the backend folder:

PORT=8081
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret

## run the backend server

npm run dev 


## Api overview

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