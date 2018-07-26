const express = require("express"),
  mongoose = require("mongoose"),
  multer = require("multer"),
  Student = require("./models/student"),
  path = require("path"),
  mongoDB = "mongodb://127.0.0.1/student-gallery",
  app = express();

const uploadRoutes = require("./routes/new");

mongoose.connect(mongoDB);

// Initialize data
// const { getData } = require("./data");
// const data = getData();
// Student.collection.insert(data, function(err, docs) {
//   if (err) {
//     return console.error(err);
//   } else {
//     console.log("Multiple documents inserted to Collection");
//   }
// });

// In development
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// In production
app.use(express.static(path.join(__dirname, "./frontend/build")));

// Config Routes
app.use("/new", uploadRoutes);

app.get("/data", (req, res) => {
  Student.find({}, (err, students) => {
    res.json(students);
  });
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
