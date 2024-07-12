const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const rideRequirements = {
  minAge: 12,
  fee: 500,
};

// {
// name: "John",
// age: 20,
// moneyBalance: 500,
// hasTicket: true
//  }

app.use(express.json());

const preCheckMiddleware = (req, res, next) => {
  const { name, age, moneyBalance, hasTicket } = req.body;

  if (
    !name ||
    !age ||
    !moneyBalance ||
    typeof hasTicket == "undefined" ||
    typeof hasTicket == null
  ) {
    res.status(400).send("Missing required fields");
  } else {
    if (age >= 12) {
      if (hasTicket) {
        next();
      } else {
        if (moneyBalance >= 500) {
          next();
        } else {
          res.status(400).send("Not enough money");
        }
      }
    } else {
      res
        .status(400)
        .send("You must be at least 12 years old to ride the rollercoaster.");
    }
  }
};

app.get("/riders", preCheckMiddleware, (req, res) => {
  res.send(`${req.body.name} started the ride`);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong");
});

app.listen(port, () => {
  console.log(`Server is running on port  ${port}`);
});
