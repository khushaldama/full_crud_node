const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/program3");
const con = mongoose.connection;
con.on("connected", () => {
  console.log("You are Connected to The DB");
});

const empSchema = mongoose.Schema({
  empID: String,
  empName: String,
  age: Number,
  salary: Number
});

const EMP = mongoose.model("employee", empSchema, "Employee");

app.use(express.static(__dirname));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/home.html");
});

app.get("/api/get", async function (req, res) {
  await EMP.find({}).then((result) => {
    res.json(result);
  });
});

app.post("/api/post", async function (req, res) {
  await EMP.create({
    empID: req.body.empID,
    empName: req.body.empName,
    age: req.body.age,
    salary: req.body.salary
  }).then((result) => {
    res.json(result);
  });
});

app.delete("/api/delete/:id", async function (req, res) {
  await EMP.deleteOne({ empID: req.params.id }).then((result) => {
    res.json(result);
  });
});

app.put("/api/put", async function (req, res) {
  await EMP.updateOne(
    { empID: req.body.empID },
    {
      $set: {
        empName: req.body.empName,
        age: req.body.age,
        salary: req.body.salary
      }
    }
  ).then((result) => {
    res.json(result);
  });
});

app.listen(4001, function () {
  console.log("Serer is Running.");
});
