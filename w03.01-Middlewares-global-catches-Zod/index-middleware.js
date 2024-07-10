const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(express.json());

// users credentials
const users = [
  { id: 1, uname: "admin", pass: "admin" },
  { id: 2, uname: "root", pass: "root" },
  { id: 3, uname: "user", pass: "pass" },
];

// global middleware to validate empty, null, undefined uname and pass
app.use((req, res, next) => {
  if (!req.headers["uname"] || !req.headers["pass"]) {
    res.status(400).json({ msg: "Username and password both required" });
  } else {
    next();
  }
});

// middleware to check credentials
const credValidateMiddleware = (req, res, next) => {
  const uname = req.headers["uname"];
  const pass = req.headers["pass"];
  let status = false;

  for (let user of users) {
    if (user.uname == uname && user.pass == pass) {
      status = true;
      break;
    }
  }

  if (status) next();
  else {
    res.status(401).json({
      msg: "Invalid Credentials",
    });
  }
};

// middleware to check if username is already present or not
const unameValidateMiddleware = (req, res, next) => {
  const uname = req.headers["uname"];
  let status = false;
  for (let user of users) {
    if (user.uname == uname) {
      status = true;
      break;
    }
  }
  if (status) {
    res.status(409).json({
      msg: "Username already exists",
    });
  } else {
    next();
  }
};

// route to show app and server is working
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// route to login with username and password
app.post("/login", credValidateMiddleware, (req, res) => {
  res.status(200).json({
    msg: "Welcome to the API",
  });
});

// route to register with username and password
app.post("/register", unameValidateMiddleware, (req, res) => {
  const uname = req.headers["uname"];
  const pass = req.headers["pass"];
  const user = { id: users.length + 1, uname, pass };
  users.push(user);
  res.status(201).json({ msg: "User registered successfully" });
});

// global catch to handle errors throught out the routes
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ msg: "Something went wrong" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
