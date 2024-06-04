import React, { useState, useEffect } from "react";
import axios from "axios";

const MarksForm = ({ fetchMarks }) => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [marks, setMarks] = useState("");

  //fetching student details from database
  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get("http://localhost:5000/api/students");
      setStudents(response.data);
    };

    // fetching teacher details from database
    const fetchTeachers = async () => {
      const response = await axios.get("http://localhost:5000/api/teachers");
      setTeachers(response.data);
    };

    fetchStudents();
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedStudent = students.find(
      (student) => student.id === studentId
    );
    const selectedTeacher = teachers.find(
      (teacher) => (teacher.name = teacherName)
    );

    const data = {
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      teacherName,
      subject: selectedTeacher.subject,
      marks,
    };

    await axios.post("http://localhost:5000/api/marks", data);
    fetchMarks();
    setStudentId("");
    setTeacherName("");
    setMarks("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        required
      >
        <option value="">Select Student</option>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.id}
          </option>
        ))}
      </select>
      <select
        value={teacherName}
        onChange={(e) => setTeacherName(e.target.value)}
        required
      >
        <option value="">Select Teacher</option>
        {teachers.map((teacher) => (
          <option key={teacher.name} value={teacher.name}>
            {teacher.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
        placeholder="Marks"
        required
      />
      <button type="submit">Add Marks</button>
    </form>
  );
};

export default MarksForm;
