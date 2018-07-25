const express = require("express"),
  router = express.Router(),
  multer = require("multer"),
  Student = require("../models/student");

function getFileExtension(string) {
  const nameArray = string.split(".");
  return nameArray[nameArray.length - 1];
}

//config multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "src/assets/img-small");
  },
  filename: function(req, file, cb) {
    const { firstName, lastName } = req.body;

    const fileID = firstName + lastName;
    const fileExtension = getFileExtension(file.originalname);
    cb(null, `${fileID}.${fileExtension}`);
  }
});

const upload = multer({ storage });

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

  let src = "";
  let alt = "";

  if (req.file) {
    const fileExtension = getFileExtension(req.file.originalname);
    //handle image name and alt
    src = `${firstName}${lastName}.${fileExtension}`;
    alt = firstName;
  }

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
    src,
    alt
  };

  const newStudent = new Student(student);
  newStudent.save(function(err, student) {
    if (err) return console.error(err);
    res.sendStatus(200);
  });
});

module.exports = router;
