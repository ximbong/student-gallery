const express = require("express"),
  router = express.Router(),
  multer = require("multer");

function getFileExtension(string) {
  const nameArray = string.split(".");
  return nameArray[nameArray.length - 1];
}

//config multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "upload/");
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
router.post("/new", upload.single("image"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send("1");
});

module.exports = router;
