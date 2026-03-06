const todos = new Map();
let nextId = 1;

module.exports = { todos, getId: () => String(nextId++) };