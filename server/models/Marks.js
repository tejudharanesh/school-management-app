const mongoose = require("mongoose");

const MarksSchema = new mongoose.Schema({
  studentId: String,
  studentName: String,
  teacherName: String,
  subject: String,
  marks: Number,
});

module.exports = mongoose.model("Marks", MarksSchema);
