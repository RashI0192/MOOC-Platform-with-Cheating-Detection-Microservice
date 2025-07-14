import React from "react";
import "../styles/TrustScoreChart.css";

const TrustScoreChart = ({ score }) => (
  <div className="trust-score-chart">
    <p>Overall Trust: {score}%</p>
    <div className="bar">
      <div className="fill" style={{ width: `${score}%` }}></div>
    </div>
  </div>
);

export default TrustScoreChart;
