const BASE = "/tasks";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (res.status === 204) return null;

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const getTasks = (status) =>
  request(status ? `?status=${status}` : "");

export const createTask = (title) =>
  request("", { method: "POST", body: JSON.stringify({ title }) });

export const updateTask = (id, fields) =>
  request(`/${id}`, { method: "PATCH", body: JSON.stringify(fields) });

export const deleteTask = (id) =>
  request(`/${id}`, { method: "DELETE" });
