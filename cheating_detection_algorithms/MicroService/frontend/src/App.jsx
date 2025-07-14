import React, { useState } from "react";
import { course } from "./data/demoData";
import StudentList from "./components/StudentList";
import TrustReport from "./components/TrustReport";

function App() {
  const [screen, setScreen] = useState("intro"); // 'intro' | 'students' | 'report'
  const [selected, setSelected] = useState(null); // selected student

  const handleStudentSelect = (student) => {
    setSelected(student);
    setScreen("report");
  };

  return (
    <div className="app">
      {screen === "intro" && (
        <div className="intro-card">
          <h1>Instructor: {course.instructor}</h1>
          <h2>Course: {course.title}</h2>
          <img src={course.thumbnail} alt="Course thumbnail" className="thumb" />
          <button className="start-btn" onClick={() => setScreen("students")}>
            View Students
          </button>
        </div>
      )}

      {screen === "students" && (
        <>
          <button className="back-btn" onClick={() => setScreen("intro")}>
            ⬅ Back to Course Info
          </button>
          <StudentList course={course} onSelect={handleStudentSelect} />
        </>
      )}

      {screen === "report" && (
        <TrustReport
          course={course}
          student={selected}
          onBack={() => {
            setSelected(null);
            setScreen("students");
          }}
        />
      )}
    </div>
  );
}

export default App;
