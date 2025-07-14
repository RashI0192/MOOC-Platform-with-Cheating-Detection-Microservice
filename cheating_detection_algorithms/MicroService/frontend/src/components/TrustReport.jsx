import React, { useState } from "react";
import TrustScoreChart from "./TrustScoreChart";
import ViolationBarChart from "./ViolationBarChart";
import "../styles/TrustReport.css";

// Aggregate violations
const aggregateCounts = (stu) => {
  const out = { Screenshot: 0, "Tab Switch": 0, "Copy‑Paste": 0 };
  stu.moduleData.forEach((m) => {
    out["Screenshot"] += m.events.screenshot.length;
    out["Tab Switch"] += m.events.tabSwitch.length;
    out["Copy‑Paste"] += m.events.paste.length;
  });
  return out;
};

const ModuleRow = ({ meta, data }) => {
  const [open, setOpen] = useState(false);
  const { screenshot, tabSwitch, paste } = data.events;
  return (
    <>
      <tr className="clickable" onClick={() => setOpen(!open)}>
        <td>{meta.name}</td>
        <td>{meta.estimated}</td>
        <td>{data.timeTaken}</td>
        <td>{screenshot.length}</td>
        <td>{tabSwitch.length}</td>
        <td>{paste.length}</td>
      </tr>
      {open && (
        <tr className="details-row">
          <td colSpan="6">
            {screenshot.length > 0 && <p><strong>Screenshots:</strong> {screenshot.join(", ")}</p>}
            {tabSwitch.length > 0 && <p><strong>Tab Switches:</strong> {tabSwitch.join(", ")}</p>}
            {paste.length > 0 && <p><strong>Copy‑Paste:</strong> {paste.map((p) => p.replace("|", " from ")).join(", ")}</p>}
            {screenshot.length + tabSwitch.length + paste.length === 0 && <p>No events </p>}
          </td>
        </tr>
      )}
    </>
  );
};

const TrustReport = ({ course, student, onBack }) => {
  const counts = aggregateCounts(student);
  const violScore = counts["Screenshot"] * 5 + counts["Tab Switch"] * 3 + counts["Copy‑Paste"] * 7;
  const paceSus = student.moduleData.slice(4).every((m) => m.timeTaken < course.modules[m.moduleId - 1].estimated * 0.5);
  const finalScore = Math.max(100 - violScore - (paceSus ? 10 : 0), 0);

  return (
    <div className="trust-report">
      <button onClick={onBack} className="back-btn">← Back</button>
      <h2>{student.name} — {course.title}</h2>

      <TrustScoreChart score={finalScore} />
      <ViolationBarChart counts={counts} />

      {paceSus && <p className="pace-warning">  Pace anomaly detected in last 3 modules</p>}

      <h3>Module Breakdown</h3>
      <table className="module-table">
        <thead>
          <tr>
            <th>Module</th>
            <th>Est (min)</th>
            <th>Took</th>
            <th>Shots</th>
            <th>Switches</th>
            <th>Paste</th>
          </tr>
        </thead>
        <tbody>
          {student.moduleData.map((m) => (
            <ModuleRow key={m.moduleId} meta={course.modules[m.moduleId - 1]} data={m} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrustReport;