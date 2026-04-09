import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const FILTERS = ["all", "incomplete", "completed"];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async (f = filter) => {
    setLoading(true);
    setError("");
    try {
      const data = await getTasks(f === "all" ? "" : f);
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(filter); }, [filter]);

  const handleAdd = async (title) => {
    const task = await createTask(title);
    if (filter === "all" || filter === "incomplete") {
      setTasks((prev) => [task, ...prev]);
    }
  };

  const handleToggle = async (id, completed) => {
    const updated = await updateTask(id, { completed });
    if (filter === "all") {
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } else {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = async (id, title) => {
    const updated = await updateTask(id, { title });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const counts = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="app">
      <header>
        <h1>📋 Task Manager</h1>
      </header>

      <main>
        <TaskForm onAdd={handleAdd} />

        <div className="filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading && <p className="status">Loading tasks…</p>}
        {error && <p className="status error">{error}</p>}

        {!loading && !error && (
          <>
            <p className="task-count">
              {counts.completed}/{counts.total} completed
            </p>
            <TaskList
              tasks={tasks}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </>
        )}
      </main>
    </div>
  );
}
