const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");
const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(cors());
app.use(express.json());
console.log("App.js loaded");
app.get("/api/health", (req, res) => {
  console.log("Health route hit");
  res.status(200).json({ status: "OK" });
});
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
module.exports = app;