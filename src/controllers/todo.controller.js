const { todos, getId } = require('../data/store');

// helper function to send error
function sendError(res, status, message) {
  return res.status(status).json({ success: false, message });
}

function getAll(req, res) {
  res.json({ success: true, data: Array.from(todos.values()) });
}

function getById(req, res) {
  const todo = todos.get(req.params.id);
  if (!todo) return res.status(404).json({ success: false, message: `Todo ${req.params.id} not found` });

  res.json({ success: true, data: todo });
}

function create(req, res) {
  const { title, completed } = req.body;

  // body rỗng hoàn toàn
  if (!req.body || Object.keys(req.body).length === 0) {
    return sendError(res, 400, 'Request body is required');
  }

  // title bắt buộc
  if (title === undefined) {
    return sendError(res, 400, 'title is required');
  }

  // title phải là string
  if (typeof title !== 'string') {
    return sendError(res, 400, 'title must be a string');
  }

  // title không được rỗng
  if (title.trim().length === 0) {
    return sendError(res, 400, 'title cannot be empty');
  }

  // title không quá dài
  if (title.length > 200) {
    return sendError(res, 400, 'title cannot exceed 200 characters');
  }

  // completed nếu có phải là boolean
  if (completed !== undefined && typeof completed !== 'boolean') {
    return sendError(res, 400, 'completed must be a boolean');
  }

  const todo = {
    id: getId(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.set(todo.id, todo);
  res.status(201).json({ success: true, data: todo });
}

function update(req, res) {
  const todo = todos.get(req.params.id);

  // if can't find data ,return status 404
  if (!todo) 
    return res.status(404).json({ success: false, message: 'Not found' });

  if (req.body.title !== undefined)     todo.title     = req.body.title;
  if (req.body.completed !== undefined) todo.completed = req.body.completed;
  todo.updatedAt = new Date().toISOString();

  todos.set(todo.id, todo);
  res.json({ success: true, data: todo });
}

function remove(req, res) {
  if (!todos.has(req.params.id)) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }
  todos.delete(req.params.id);
  res.json({ success: true, data: { deleted: true } });
}

module.exports = { getAll, getById, create, update, remove };