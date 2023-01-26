require("dotenv").config();
const express = require("express");
const cors = require("cors");
const knex = require("knex");

const profile = require("./controllers/profile");
const image = require("./controllers/image");

//Database Setup - add your own information here based on the DB you created
const db = knex({
  client: "pg",
  connection: process.env.PG_URL,
});

const app = express();

app.use(cors());
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

app.get(["/", "/:name"], (req, res) => {
  greeting = "<h1>Hello From Node on Fly!</h1>";
  name = req.params["name"];
  if (name) {
    res.send(greeting + "</br>and hello to " + name);
  } else {
    res.send(greeting);
  }
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.post("/profile/:id", (req, res) => {
  profile.handleProfileUpdate(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

const port = process.env.PORT || "8080";

app.listen(port, () => {
  console.log("app is running on port 8080");
});
