const express = require("express");
const mongoose = require("mongoose");
const {
  createToDoSchema,
  changeStatusSchema,
  getToDoByIdSchema,
  updateToDoSchema,
  deleteToDoSchema,
} = require("./zod-validations/notes-types");
const { todoDb } = require("./database/todo-db");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/createTodo", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createToDoSchema.safeParse(createPayload);

  if (!parsedPayload.success) {
    res.status(411).send({
      msg: "Invalid Inputs",
      error: parsedPayload.error.issues[0].message,
    });
    return;
  }

  await todoDb
    .create({
      title: parsedPayload.data.title,
      description: parsedPayload.data.description,
      completed: false,
    })
    .then((todo) => {
      res.status(200).json({
        todo: todo,
        msg: "Todo Created Successfully",
      });
      return;
    });
});

app.get("/todos", async (req, res) => {
  await todoDb.find({}).then((todos) => {
    res.status(200).json(todos);
    return;
  });
});

app.get("/todo", async (req, res) => {
  const getTodoByIdPayLoad = req.body;
  const parsedPayload = getToDoByIdSchema.safeParse(getTodoByIdPayLoad);

  if (!parsedPayload) {
    res.status(411).send({
      msg: "Invalid Inputs",
    });
    return;
  }

  await todoDb.findOne({ _id: parsedPayload.data.id }).then((todo) => {
    res.status(200).json(todo);
    return;
  });
});

app.put("/updateTodo", async (req, res) => {
  const updateTodoPayLoad = req.body;
  const parsedPayload = updateToDoSchema.safeParse(updateTodoPayLoad);

  if (!parsedPayload) {
    res.status(411).send({
      msg: "Invalid Inputs",
    });
    return;
  }

  await todoDb
    .findOneAndUpdate(
      { _id: parsedPayload.data.id },
      {
        title: parsedPayload.data.title,
        description: parsedPayload.data.description,
        completed: parsedPayload.data.completed,
      }
    )
    .then((todo) => {
      res.status(200).json(todo);
      return;
    });
});

app.put("/changeStatus", async (req, res) => {
  const changeStatusPayload = req.body;
  const parsedPayload = changeStatusSchema.safeParse(changeStatusPayload);

  if (!parsedPayload.success) {
    res.status(411).send({
      msg: "Invalid ID",
      error: parsedPayload.error.issues[0].message,
    });
    return;
  }

  await todoDb.findOne({ _id: parsedPayload.data.id }).then(async (todo) => {
    await todoDb
      .updateOne(
        {
          _id: parsedPayload.data.id,
        },
        {
          completed: !todo.completed,
        }
      )
      .then((todo) => {
        res.status(200).json({
          todo: todo,
          msg: "Todo Updated Successfully",
        });
        return;
      });
  });
});

app.delete("/deleteTodo", async (req, res) => {
  const deleteTodoPayload = req.body;
  const parsedPayload = deleteToDoSchema.safeParse(deleteTodoPayload);
  if (!parsedPayload.success) {
    res.status(411).send({
      msg: "Invalid ID",
    });
    return;
  }

  await todoDb.deleteOne({ _id: parsedPayload.data.id }).then((todo) => {
    res.status(200).json({
      todo: todo,
      msg: "ToDo Deleted",
    });
    return;
  });
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send({
      err: err.message,
      msg: "Internal Server Error",
    });
    return;
  }
});

app.listen(port, () => {
  console.log(`Server listening on ${port} port`);
});
