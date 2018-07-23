const express = require("express"),
  mongoose = require("mongoose"),
  mongoDB = "mongodb://127.0.0.1/student-gallery";

const { getData } = require("./data");
const app = express();
const data = getData();
mongoose.connect(mongoDB);

app.use(function(req, res, next) {
  if (req.headers.origin) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    if (req.method === "OPTIONS") return res.send(200);
  }
  next();
});

app.get("/", (req, res) => {
  res.json(data);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
