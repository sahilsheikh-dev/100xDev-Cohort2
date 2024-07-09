const express = require("express");
const app = express();
const port = 3000;
const zod = require("zod");

const bodyParser = require("body-parser");

const userSchema = zod.object({
  name: zod.string(),
  age: zod.number(),
  gender: zod.string(),
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  const result = userSchema.safeParse(req.body);
  if (result.success) {
    next();
  } else {
    res.status(400).json({ error: result.error });
  }
});

app.use(bodyParser.json());
app.get("/getBody", (req, res) => {
  res.status(200).send(req.body);
});

// global catch
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
