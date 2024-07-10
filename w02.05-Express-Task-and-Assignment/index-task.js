const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(express.json()); // The express. json() function is a middleware function used in Express. js applications to parse incoming JSON data from HTTP requests, a standard format for data transmission in web servers. Suppose we have created an API that sends data in JSON format.

let kidneys = [
  {
    id: 1,
    name: "Kidney 1",
    description: "Kidney 1 description",
    price: 100,
    condition: "Unhealthy",
  },
  {
    id: 2,
    name: "Kidney 2",
    description: "Kidney 2 description",
    price: 200,
    condition: "Healthy",
  },
  {
    id: 3,
    name: "Kidney 3",
    description: "Kidney 3 description",
    price: 300,
    condition: "Healthy",
  },
];

// Welcome API Route
app.get("/", (req, res) => {
  res.status(200).send("Kidneys Details");
});

// Get all Kidneys API Route
app.get("/getKidneys", (req, res) => {
  res.status(200).send(kidneys);
});

// Get Kidney by ID API Route
app.get("/getKidney", (req, res) => {
  const id = req.query["id"];
  const kidney = kidneys.filter((kidney) => kidney.id == id);
  if (kidney != 0) res.status(200).send(kidney);
  else res.status(404).send("Kidney not found");
});

// Add a new Kidney API Route
app.use(bodyParser.json());
app.post("/addKidney", (req, res) => {
  const kidney = req.body;
  const id = req.body["id"];
  const idValidation = kidneys.filter((k) => k.id == id);
  if (idValidation.length == 0) {
    kidneys.push(kidney);
    res.status(200).send(kidneys);
  } else {
    res.status(400).send("ID of Kidney is already exists");
  }
});

// Update the Existing Kidney Details API Route
app.use(bodyParser.json());
app.put("/updateKidney", (req, res) => {
  const kidney = req.body;
  const id = kidney.id;
  const existsKidney = kidneys.filter((k) => k.id == id);
  let status = false;
  if (existsKidney != 0) {
    for (let k of kidneys) {
      if (k.id == id) {
        k.name = kidney.name;
        k.description = kidney.description;
        k.price = kidney.price;
        k.condition = kidney.condition;
        status = true;
        break;
      }
    }
  }
  if (status) res.status(200).send(kidney);
  else res.status(404).send("Kidney not found");
});

// Update Kidney's Health Condition API Route
app.put("/updateConditionTohealthy", (req, res) => {
  const id = req.query["id"];
  const kidney = kidneys.filter((k) => k.id == id);
  let status = false;
  if (kidney != 0) {
    if (kidney[0].condition != "Healthy") {
      for (let k of kidneys) {
        if (k.id == id) {
          k.condition = "Healthy";
          status = true;
          break;
        }
      }
    } else status = true;
  }

  if (status) {
    res.status(200).send("Kidney is healthy now");
  } else res.status(404).send("Kidney not found");
});

// Delete a Kidney API Route
app.delete("/deleteKidney", (req, res) => {
  const id = req.query["id"];
  const kidney = kidneys.filter((k) => k.id == id);
  if (kidney.length != 0) {
    for (let k of kidney) {
      kidneys.splice(kidneys.indexOf(k), 1);
      res.status(200).send(kidneys);
    }
  } else res.status(404).send("Kidney not found");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
