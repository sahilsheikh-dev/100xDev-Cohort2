const express = require("express");
const app = express();
const port = 3000;

// to get body parameters
const bodyParser = require("body-parser");

app.get("/", (req, res) => {
  res.send("Hello World! I am a server");
});

app.get("/user-details", (req, res) => {
  const userDetails = {
    name: "John Doe",
    age: 30,
    address: "123 Main St",
  };
  res.send(userDetails);
});

app.post("/headers-example", (req, res) => {
  console.log(req.headers["admin"]);
  res.send(`Hello ${req.headers["admin"]}! I am a server`);
});

app.use(bodyParser.json());
app.post("/body-example", (req, res) => {
  console.log(req.body);
  res.send(`Hello ${req.body.username}! I am a server`);
});

app.post("/query-example", (req, res) => {
  console.log(req.query);
  res.send(`Hello ${req.query.username}! I am a server`);
});

app.listen(port, () => {
  console.log(`Running port - ${port}`);
});
