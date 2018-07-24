const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  title: String,
  nationality: String,
  src: String,
  alt: String,
  skills: [String],
  whySofterDeveloper: String,
  longTermVision: String,
  motivatesMe: String,
  favoriteQuote: String,
  joinedOn: String
});

module.exports = mongoose.model("Student", studentSchema);
