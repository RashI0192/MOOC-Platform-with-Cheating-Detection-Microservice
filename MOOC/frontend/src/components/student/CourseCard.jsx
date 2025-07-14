import { Link } from 'react-router-dom';
import './CourseCard.css';

export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      <img src={course.thumbnail ? `/uploads/${course.thumbnail}` : '/placeholder.jpg'} alt="thumb" />
      <h3>{course.title}</h3>
      <p className="instructor-name">Instructor: {course.instructor?.username || 'N/A'}</p>
      <Link to={`/student/player/${course._id}`} className="btn">Start Course</Link>
    </div>
  );
}
