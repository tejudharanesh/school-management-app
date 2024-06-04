const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/school", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const studentRoutes = require("./routes/studentRoute");
const teacherRoutes = require("./routes/teacherRoute");
const marksRoutes = require("./routes/marksRoute");

app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/marks", marksRoutes);

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
