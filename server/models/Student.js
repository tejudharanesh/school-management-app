const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: String,
  name: String,
  age: Number,
  section: String,
});

module.exports = mongoose.model("Student", studentSchema);
