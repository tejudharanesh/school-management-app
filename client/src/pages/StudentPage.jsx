import React, { useEffect, useState } from "react";
import axios from "axios";
import Student from "../components/Student";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:5000/api/students");
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleDelete = async (studentId) => {
    await axios.delete(`http://localhost:5000/api/students/${studentId}`);
    fetchStudents();
  };

  const handleFormSubmit = () => {
    setEditingStudent(null);
    fetchStudents();
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <Student
        fetchStudents={fetchStudents}
        editingStudent={editingStudent}
        onFormSubmit={handleFormSubmit}
      />
      <table>
        {students.map((student) => (
          <tr key={student._id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.age}</td>
            <td>{student.section}</td>
            <td>
              <button onClick={() => handleEdit(student)}>Edit</button>
            </td>
            <td>
              <button onClick={() => handleDelete(student._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default StudentPage;
