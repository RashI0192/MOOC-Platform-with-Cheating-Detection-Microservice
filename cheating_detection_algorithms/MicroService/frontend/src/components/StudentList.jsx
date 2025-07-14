import React from "react";
import "../styles/StudentList.css";

// helper: completed‑module percentage
const progressPct = (student, total) => {
  const done = student.moduleData.filter((m) => m.timeTaken !== undefined).length;
  return Math.round((done / total) * 100);
};

// helper: quick trust score
const calcTrust = (student) => {
  let s = 0,
    t = 0,
    p = 0;
  student.moduleData.forEach((m) => {
    s += m.events.screenshot.length;
    t += m.events.tabSwitch.length;
    p += m.events.paste.length;
  });
  let score = 100 - (s * 5 + t * 3 + p * 7);
  const rushed = student.moduleData.slice(4).every((m) => m.timeTaken < 5);
  if (rushed) score -= 10;
  return Math.max(score, 0);
};

const StudentList = ({ course, onSelect }) => (
  <div className="student-list">
    <table className="student-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Progress</th>
          <th>Trust</th>
        </tr>
      </thead>
      <tbody>
        {course.students.map((stu) => (
          <tr key={stu.id} className="clickable" onClick={() => onSelect(stu)}>
            <td>{stu.name}</td>
            <td>{progressPct(stu, course.modules.length)}%</td>
            <td>{calcTrust(stu)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default StudentList;
