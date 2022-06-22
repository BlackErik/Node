const todo_db = {};

function makeid(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

const setupTodo = function (todoData) {
  let deadline = new Date();
  let done = false;
  if (todoData.deadline) {
    deadline = new Date(todoData.deadline);
  }
  if (todoData.done) {
    done = todoData.done;
  }
  return {
    name: todoData.name || "",
    description: todoData.description || "",
    done: done,
    deadline: deadline,
  };
};

const addTodo = function (todo) {
  id = makeid(8);
  todo.id = id;
  todo_db[id] = todo;
  console.log(todo_db);
  return todo;
};

const getTodo = function (id) {
  return todo_db[id];
};

const getTodos = function () {
  return todo_db;
};

const deleteTodo = function (id) {
  const todo = todo_db[id];
  delete todo_db[id];
  return todo;
};

const setTodo = function (id, todo) {
  todo_db[id] = todo;
  return todo;
};

const patchTodo = function (id, todoData) {
  for (const key in todoData) {
    todo_db[id][key] = todoData[key];
  }

  const todo = todo_db[id];
  return todo;
};

module.exports = {
  addTodo: addTodo,
  getTodo: getTodo,
  getTodos: getTodos,
  deleteTodo: deleteTodo,
  setupTodo: setupTodo,
  setTodo: setTodo,
  patchTodo: patchTodo,
};
