const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: String,
  subject: String,
});

module.exports = mongoose.model("Teacher", teacherSchema);
