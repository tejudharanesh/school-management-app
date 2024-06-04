import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherForm = ({ fetchTeachers, editingTeacher, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
  });

  useEffect(() => {
    if (editingTeacher) {
      setFormData({
        name: editingTeacher.name,
        subject: editingTeacher.subject,
      });
    } else {
      setFormData({ name: "", subject: "" });
    }
  }, [editingTeacher]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTeacher) {
      await axios.put(
        `http://localhost:5000/api/teachers/${editingTeacher._id}`,
        formData
      );
    } else {
      await axios.post("http://localhost:5000/api/teachers", formData);
    }
    onFormSubmit();
    setFormData({ name: "", subject: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleInputChange}
        placeholder="Subject"
      />
      <button type="submit">{editingTeacher ? "Update" : "Add"}</button>
    </form>
  );
};

export default TeacherForm;
