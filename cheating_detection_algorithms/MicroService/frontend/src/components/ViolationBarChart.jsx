import React from "react";
import "../styles/ViolationBarChart.css";

const ViolationBarChart = ({ counts }) => {
  const maxCount = Math.max(...Object.values(counts), 1); // Avoid divide by 0

  return (
    <div className="violation-bar-chart">
      <h3>Violation Breakdown</h3>
      {Object.entries(counts).map(([type, count]) => (
        <div key={type} className="bar-row">
          <span>{type}</span>
          <div className="bar">
            <div
              className="fill"
              style={{ width: `${(count / maxCount) * 100}%` }}
            ></div>
          </div>
          <span style={{ marginLeft: "10px" }}>{count}</span>
        </div>
      ))}
    </div>
  );
};

export default ViolationBarChart;
