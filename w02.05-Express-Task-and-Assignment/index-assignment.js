const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/files", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(files);
    }
  });
});

app.get("/file", (req, res) => {
  fs.readFile("./files/" + req.query.name, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
