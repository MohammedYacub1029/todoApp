const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const router = express.Router();

// Create task
router.post("/", authMiddleware, createTask);

// Get tasks (with filters)
router.get("/", authMiddleware, getTasks);

// Update task
router.put("/:id", authMiddleware, updateTask);

// Delete task
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;