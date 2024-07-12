const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;
const jwtPassword = "1234567890";

app.use(express.json());

const credValidationMiddleware = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("Invalid credentials");
  } else if (username != "john@gmail.com" && password != "1234567890") {
    res.status(401).send("Invalid credentials");
  } else {
    next();
  }
};

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send("No token provided");
  } else {
    next();
  }
};

app.post("/signin", credValidationMiddleware, (req, res) => {
  const { username, password } = req.body;
  const userDetails = {
    username,
    password,
  };
  const token = jwt.sign(userDetails, jwtPassword);
  res.send({ token });
});

app.post("/decodeUserToken", tokenValidation, (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    if (decoded) {
      res.status(200).send("Token Decoded");
    } else {
      res.status(401).send("Invalid token");
    }
  } catch (error) {
    res.status(401).send("Invalid token");
  }
});

app.post("/verifyUser", tokenValidation, (req, res) => {
  try {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, jwtPassword);
    res.status(200).send(decode);
  } catch (error) {
    res.status(401).send("Invalid token");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
