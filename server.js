// initiate express server
// npm install express --save
const express = require("express");
const cors = require("cors");
const app = express();

const persist = require("./persist/memory");

app.use(cors());
app.use(express.json());

const Todo = require("./persist/todo");

// set up server paths and handlers

app.post("/todo", (req, res) => {
  const vTodo = persist.setupTodo(req.body);
  Todo.create(vTodo)
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.get("/todo/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .then((todo) => {
      if (todo == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.get("/todos", (req, res) => {
  Todo.find()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.put("/todo/:id", (req, res) => {
  const id = req.params.id;
  const todo = persist.setupTodo(req.body);
  Todo.findByIdAndUpdate(id, todo, { new: true })
    .then((todo) => {
      if (todo == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.patch("/todo/:id", (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndUpdate(id, req.body, { new: true })
    .then((todo) => {
      if (todo == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.delete("/todo/:id", (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id)
    .then((todo) => {
      if (todo == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = app;
