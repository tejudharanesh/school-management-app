const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Create a new student
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
    console.log("successful");
  } catch (error) {
    res.status(500).json({ error: "Could not create student" });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().limit(10);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve students" });
  }
});

// Update a student
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Could not update student" });
  }
});

// Delete a student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete student" });
  }
});

module.exports = router;
