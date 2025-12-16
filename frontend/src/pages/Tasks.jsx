import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import { logout } from "../utils.js/auth";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const query = new URLSearchParams();
      if (statusFilter) query.append("status", statusFilter);
      if (priorityFilter) query.append("priority", priorityFilter);

      const data = await apiRequest(`/tasks?${query.toString()}`);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, priorityFilter]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await apiRequest("/tasks", {
        method: "POST",
        body: JSON.stringify({ title, priority }),
      });

      setTitle("");
      setPriority("Medium");
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const markCompleted = async (id) => {
    try {
      await apiRequest(`/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: "Completed" }),
      });
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await apiRequest(`/tasks/${id}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>My Tasks</h2>

      <button onClick={handleLogout} style={{ float: "right", marginTop: '7px' }}>
        Logout
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleCreateTask} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: 8, width: "60%" }}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ padding: 8, marginLeft: 8 }}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button type="submit" style={{ marginLeft: 8 }}>
          Add
        </button>
      </form>

      <div style={{ marginBottom: 20 }}>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          style={{ marginLeft: 8 }}
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginBottom: 10 }}>
            <strong>{task.title}</strong> — {task.priority} — {task.status}

            {task.status !== "Completed" && (
              <button
                onClick={() => markCompleted(task._id)}
                style={{ marginLeft: 8 }}
              >
                Complete
              </button>
            )}

            <button
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: 8 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}