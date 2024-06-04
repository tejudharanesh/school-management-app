import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentForm = ({ fetchStudents, editingStudent, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    section: "",
    id: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        age: editingStudent.age,
        section: editingStudent.section,
      });
    } else {
      setFormData({ name: "", age: "", section: "", id: "" });
    }
  }, [editingStudent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //function to handle after submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingStudent) {
      await axios.put(
        `http://localhost:5000/api/students/${editingStudent._id}`,
        formData
      );
    } else {
      await axios.post("http://localhost:5000/api/students", formData);
    }
    onFormSubmit();
    setFormData({ name: "", age: "", section: "", id: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleInputChange}
        placeholder="Id"
      />

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleInputChange}
        placeholder="Age"
      />
      <input
        type="text"
        name="section"
        value={formData.section}
        onChange={handleInputChange}
        placeholder="Section"
      />
      <button type="submit">{editingStudent ? "Update" : "Add"}</button>
    </form>
  );
};

export default StudentForm;
