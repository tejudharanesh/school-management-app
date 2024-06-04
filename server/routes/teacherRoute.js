const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");

// Create a new teacher
router.post("/", async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Could not create teacher" });
  }
});

// Get all teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find().limit(10);
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve teachers" });
  }
});

// Update a teacher
router.put("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Could not update teacher" });
  }
});

// Delete a teacher
router.delete("/:id", async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete teacher" });
  }
});

module.exports = router;
