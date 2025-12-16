# TodoApp – Full Stack Task Management Application

A minimal full-stack task management application with user authentication and task CRUD functionality.

## Design Overview

This application follows a simple and clear separation of concerns to keep the system easy to understand, test, and extend.

- **Backend** exposes RESTful APIs using Express. Business logic is handled in controllers, routing is isolated in route files, and cross-cutting concerns like authentication are handled via middleware.
- **Authentication & Authorization** are implemented using JWT. Tokens are issued on login and verified on every protected request using middleware.
- **Data Layer** uses MongoDB with Mongoose models to define schemas and enforce structure. Tasks are associated with users to ensure data isolation.
- **Frontend** is a minimal React application that consumes the backend APIs, handles authentication state, and provides a simple UI for task management.
- **Configuration** (such as database connection and secrets) is externalized using environment variables, allowing easy switching between MongoDB Atlas and local MongoDB without code changes.

The design prioritizes correctness, clarity, and maintainability over premature optimization or unnecessary complexity.

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

## Folder Structure

```text
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
```

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

## Database Configuration

This application uses MongoDB for data persistence and supports both **MongoDB Atlas** and **local MongoDB**.

The application code is not tightly coupled to a specific MongoDB deployment.  
Switching between MongoDB Atlas and a local MongoDB instance only requires changing the environment configuration.

### Option 1: MongoDB Atlas (Recommended for quick setup)

1. Create a MongoDB Atlas cluster.
2. Whitelist your IP address in Atlas Network Access.
3. Set the connection string in the `.env` file:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/todoapp
```

### Option 2: Local MongoDB

1. Install MongoDB locally and ensure the MongoDB service is running.
2. Update the `.env` file with the local connection string:

```env
MONGO_URI=mongodb://127.0.0.1:27017/todoapp
```

3. Restart the backend server.

No application code changes are required when switching between MongoDB Atlas and local MongoDB.

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