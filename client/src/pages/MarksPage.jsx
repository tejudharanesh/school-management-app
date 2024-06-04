import React, { useEffect, useState } from "react";
import axios from "axios";
import Marks from "../components/Marks";

const MarksPage = () => {
  const [marks, setMarks] = useState([]);

  const fetchMarks = async () => {
    const response = await axios.get("http://localhost:5000/api/marks");
    setMarks(response.data);
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  return (
    <div>
      <h1>Marks Dashboard</h1>
      <Marks fetchMarks={fetchMarks} />
      <table>
        {marks.map((mark) => (
          <tr key={mark._id}>
            <td>{mark.studentId}</td>
            <td>{mark.studentName}</td>
            <td>{mark.teacherName}</td>
            <td>{mark.subject}</td>
            <td>{mark.marks}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default MarksPage;
