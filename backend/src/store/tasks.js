const { v4: uuidv4 } = require("uuid");

let tasks = [];

const getAll = () => tasks;

const getById = (id) => tasks.find((t) => t.id === id);

const create = (title) => {
  const task = {
    id: uuidv4(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
};

const update = (id, fields) => {
  const task = getById(id);
  if (!task) return null;
  Object.assign(task, fields);
  return task;
};

const remove = (id) => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};

module.exports = { getAll, getById, create, update, remove };
