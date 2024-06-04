// routes/marks.js
const express = require("express");
const router = express.Router();
const Marks = require("../models/Marks");

// route to get all marks
router.get("/", async (req, res) => {
  try {
    const marks = await Marks.find();
    res.json(marks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//post route to add marks to database
router.post("/", async (req, res) => {
  const marks = new Marks(req.body);
  try {
    const newMarks = await marks.save();
    res.status(201).json(newMarks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
