import React from "react";
import "../styles/CourseCard.css";

const CourseCard = ({ course, onSelect }) => (
  <div className="course-card" onClick={() => onSelect(course)}>
    <img src={course.thumbnail} alt={course.title} />
    <div className="info">
      <h3>{course.title}</h3>
      <p>{course.students.length} students</p>
    </div>
  </div>
);

export default CourseCard;