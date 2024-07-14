const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/todo";

mongoose.connect(DB_URL);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todoDb = mongoose.model("todo", todoSchema);

module.exports = {
  todoDb,
};
