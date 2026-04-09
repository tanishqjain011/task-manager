import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editError, setEditError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleToggle = async () => {
    setBusy(true);
    try { await onToggle(task.id, !task.completed); }
    finally { setBusy(false); }
  };

  const handleDelete = async () => {
    setBusy(true);
    try { await onDelete(task.id); }
    finally { setBusy(false); }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const trimmed = editTitle.trim();
    if (!trimmed) return setEditError("Title cannot be empty.");
    if (trimmed.length > 200) return setEditError("Title must be 200 characters or fewer.");

    setBusy(true);
    setEditError("");
    try {
      await onEdit(task.id, trimmed);
      setEditing(false);
    } catch (err) {
      setEditError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <li className={`task-item${task.completed ? " completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        disabled={busy}
        aria-label="Mark complete"
      />

      {editing ? (
        <form className="edit-form" onSubmit={handleEdit}>
          <input
            autoFocus
            value={editTitle}
            maxLength={200}
            onChange={(e) => { setEditTitle(e.target.value); setEditError(""); }}
            disabled={busy}
          />
          <button type="submit" disabled={busy}>Save</button>
          <button type="button" onClick={() => { setEditing(false); setEditTitle(task.title); }}>Cancel</button>
          {editError && <span className="form-error">{editError}</span>}
        </form>
      ) : (
        <>
          <span className="task-title" onDoubleClick={() => setEditing(true)}>{task.title}</span>
          <div className="task-actions">
            <button className="btn-edit" onClick={() => setEditing(true)} disabled={busy} aria-label="Edit">✏️</button>
            <button className="btn-delete" onClick={handleDelete} disabled={busy} aria-label="Delete">🗑️</button>
          </div>
        </>
      )}
    </li>
  );
}
