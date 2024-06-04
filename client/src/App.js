import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import StudentPage from "./pages/StudentPage";
import MarksPage from "./pages/MarksPage";
import TeacherPage from "./pages/TeacherPage";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<StudentPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/marks" element={<MarksPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
