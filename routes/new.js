const express = require("express"),
  router = express.Router(),
  multer = require("multer"),
  cloudinary = require("cloudinary"),
  key = require("../config/key"),
  Student = require("../models/student");

//cloudinary config here
cloudinary.config({
  cloud_name: "ximbong91023",
  api_key: key.api_key,
  api_secret: key.api_secret
});

const upload = multer({ dest: "../tmp/uploads" });

const saveStudent = (student, res) => {
  const newStudent = new Student(student);
  newStudent.save(function(err, student) {
    if (err) return console.error(err);
    res.sendStatus(200);
  });
};

//handle post
router.post("/", upload.single("image"), (req, res) => {
  const {
    firstName,
    lastName,
    title,
    nationality,
    skills,
    whySofterDeveloper,
    longTermVision,
    motivatesMe,
    favoriteQuote,
    joinedOn
  } = req.body;

  const skillsArray = JSON.parse(skills);

  const student = {
    firstName,
    lastName,
    title,
    nationality,
    skills: skillsArray,
    whySofterDeveloper,
    longTermVision,
    motivatesMe,
    favoriteQuote,
    joinedOn,
    src: "",
    alt: firstName
  };

  if (req.file) {
    //handle image name and alt
    let imageName = `${firstName}${lastName}`;

    cloudinary.v2.uploader.upload(
      req.file.path,
      { public_id: imageName },
      function(error, result) {
        student.src = result.secure_url;
        saveStudent(student, res);
      }
    );
  } else {
    saveStudent(student, res);
  }
});

module.exports = router;
