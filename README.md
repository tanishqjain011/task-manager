# Task Manager

A simple full-stack Task Manager built with React (frontend) and Node.js + Express (backend).
<img width="1241" height="580" alt="image" src="https://github.com/user-attachments/assets/12dd75d7-d0aa-45ad-843d-22a37ee41ca1" />


## Stack

| Layer    | Tech                          |
|----------|-------------------------------|
| Frontend | React 18, Vite                |
| Backend  | Node.js, Express              |
| Storage  | In-memory (no DB required)    |

## Features

- View all tasks
- Add a new task
- Mark a task as complete / incomplete
- Edit a task title (click ✏️ or double-click the title)
- Delete a task
- Filter by All / Incomplete / Completed
- Loading and error states throughout
- Input validation on both frontend and backend

---

## Setup & Running

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### 1. Backend

```bash
cd backend
npm install
npm start          # runs on http://localhost:4000
# or for auto-reload:
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev        # runs on http://localhost:3000
```

The Vite dev server proxies `/tasks` requests to `localhost:4000`, so no CORS setup is needed during development.

Open **http://localhost:3000** in your browser.

---

## API Reference

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| GET    | /tasks         | Return all tasks         |
| GET    | /tasks?status=completed \| incomplete | Filtered list |
| POST   | /tasks         | Create a task `{ title }` |
| PATCH  | /tasks/:id     | Update `{ completed?, title? }` |
| DELETE | /tasks/:id     | Delete a task            |

### Task object

```json
{
  "id": "uuid",
  "title": "Buy milk",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

## Assumptions & Trade-offs

- **In-memory storage**: Tasks reset on server restart. This satisfies the assignment spec (a database is optional). For persistence, swap `src/store/tasks.js` with a file-based or DB-backed store.
- **No auth**: The assignment doesn't require it; adding it would be the first production step.
- **Vite proxy**: Used to avoid CORS config in dev. In production, serve the built frontend from a CDN/static host and point `VITE_API_BASE` to the backend URL, or serve the frontend build from Express.
- **Double-click to edit**: Bonus feature — also accessible via the ✏️ button.
- **Filter is client-side request**: The filter query param is passed to the API so the backend does the filtering, keeping the frontend stateless with respect to the full list.
