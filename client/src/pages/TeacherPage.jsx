import React, { useEffect, useState } from "react";
import axios from "axios";
import Teacher from "../components/Teacher";

const TeacherPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const fetchTeachers = async () => {
    const response = await axios.get("http://localhost:5000/api/teachers");
    setTeachers(response.data);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
  };

  const handleDelete = async (teacherId) => {
    await axios.delete(`http://localhost:5000/api/teachers/${teacherId}`);
    fetchTeachers();
  };

  const handleFormSubmit = () => {
    setEditingTeacher(null);
    fetchTeachers();
  };

  return (
    <div>
      <h1>Teacher dashboard</h1>
      <Teacher
        fetchTeachers={fetchTeachers}
        editingTeacher={editingTeacher}
        onFormSubmit={handleFormSubmit}
      />
      <table>
        {teachers.map((teacher) => (
          <tr key={teacher._id}>
            <td>{teacher.name}</td>
            <td>{teacher.subject}</td>
            <td>
              <button onClick={() => handleEdit(teacher)}>Edit</button>
            </td>
            <td>
              <button onClick={() => handleDelete(teacher._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default TeacherPage;
