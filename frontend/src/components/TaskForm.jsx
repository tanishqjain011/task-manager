import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return setError("Task title cannot be empty.");
    if (trimmed.length > 200) return setError("Title must be 200 characters or fewer.");

    setLoading(true);
    setError("");
    try {
      await onAdd(trimmed);
      setTitle("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task title…"
        value={title}
        maxLength={200}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
        disabled={loading}
        aria-label="Task title"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding…" : "Add Task"}
      </button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
