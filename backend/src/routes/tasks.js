const express = require("express");
const router = express.Router();
const store = require("../store/tasks");

// GET /tasks
router.get("/", (req, res) => {
  const { status } = req.query;
  let tasks = store.getAll();

  if (status === "completed") tasks = tasks.filter((t) => t.completed);
  else if (status === "incomplete") tasks = tasks.filter((t) => !t.completed);

  res.json(tasks);
});

// POST /tasks
router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "title is required and must be a non-empty string" });
  }
  if (title.trim().length > 200) {
    return res.status(400).json({ error: "title must be 200 characters or fewer" });
  }

  const task = store.create(title);
  res.status(201).json(task);
});

// PATCH /tasks/:id
router.patch("/:id", (req, res) => {
  const { completed, title } = req.body;
  const updates = {};

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ error: "completed must be a boolean" });
    }
    updates.completed = completed;
  }

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "title must be a non-empty string" });
    }
    if (title.trim().length > 200) {
      return res.status(400).json({ error: "title must be 200 characters or fewer" });
    }
    updates.title = title.trim();
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No valid fields provided to update" });
  }

  const task = store.update(req.params.id, updates);
  if (!task) return res.status(404).json({ error: "Task not found" });

  res.json(task);
});

// DELETE /tasks/:id
router.delete("/:id", (req, res) => {
  const deleted = store.remove(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Task not found" });
  res.status(204).send();
});

module.exports = router;
