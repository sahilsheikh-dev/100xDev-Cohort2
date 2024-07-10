const express = require("express");
const bodyParse = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const jwtPassword = "1234567890";

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/jwtauth");

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

// middleware to validate empty, null, undefined email and pass
app.use(bodyParse.json());
const emailPasswordNullCheck = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ msg: "email and password both required" });
  } else {
    next();
  }
};

// middleware to validate empty, null, undefined token
const tokenNullCheck = (req, res, next) => {
  if (!req.headers["authorization"]) {
    res.status(400).json({ msg: "authorization token both required" });
  } else {
    next();
  }
};

// middleware to check credentials
const credValidateMiddleware = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  await User.findOne({ email: email, password: password })
    .then((user) => {
      if (!user) {
        res.status(401).json({ msg: "invalid credentials" });
      } else {
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: `server error ${err}` });
    });
};

// to signup user
app.use(bodyParse.json());
app.post("/signup", emailPasswordNullCheck, async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    res.status(400).json({ msg: "User already exists" });
  } else {
    const user = new User({ name, email, password });
    user.save();
    res.status(200).json({ msg: "User added successfully" });
  }
});

// to signin user and generate jwt token
app.use(bodyParse.json());
app.post(
  "/signin",
  emailPasswordNullCheck,
  credValidateMiddleware,
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ user }, jwtPassword);
    res.status(200).json({ token });
  }
);

// to get user via jwt token
app.get("/users", tokenNullCheck, (req, res) => {
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, jwtPassword);
    const email = decoded.user.email;

    User.findOne({ email: email })
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((err) => {
        res.status(500).json({ msg: `server error ${err}` });
      });
  } catch (error) {
    res.status(401).json({ msg: "invalid token" });
  }
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
