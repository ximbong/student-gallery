const express = require("express"),
  mongoose = require("mongoose"),
  multer = require("multer"),
  Student = require("./models/student"),
  path = require("path"),
  key = require("./config/key"),
  app = express();

const uploadRoutes = require("./routes/new");
var mongoDB = `mongodb://${key.mLab_ID}:${
  key.mLab_pw
}@ds257241.mlab.com:57241/student-gallery`;

mongoose.connect(mongoDB);

// //Initialize data
// const { getData } = require("./data");
// const data = getData();
// Student.collection.insert(data, function(err, docs) {
//   if (err) {
//     return console.error(err);
//   } else {
//     console.log("Multiple documents inserted to Collection");
//   }
// });

// In production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend/build")));
}

// Config Routes
app.use("/new", uploadRoutes);

app.get("/data", (req, res) => {
  Student.find({}, (err, students) => {
    res.json(students);
  });
});

var port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
