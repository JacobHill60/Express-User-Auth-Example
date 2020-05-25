import Express from "express";
import bcrypt from "bcrypt";
//import Products from "./products";
//const bcrypt = require("bcrypt");
const app = Express();
const port = 3000;
app.use(Express.json());
const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});
app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //Salt printed then password printed
    // The password consists of the salt at the beginning
    // this is how bcrypt is keeping the password comparison

    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }

  //using hash algorithm
  ///
  //salt makes the same password unique
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user == null) {
    return res.status(400).send("User does not exist");
  }
  ///Try catch where we'll compare our password
  //bcrypt.compare(initial password, hashed password)
  //bcrpt.compare prevents timing attacks
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(port, () => console.log("port" + port));
