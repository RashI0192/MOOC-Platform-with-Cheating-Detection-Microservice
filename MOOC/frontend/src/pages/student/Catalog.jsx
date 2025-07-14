import { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '../../components/student/CourseCard';

export default function Catalog() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('/api/student/courses') // public endpoint listing all courses
      .then(res => setCourses(res.data))
      .catch(() => setCourses([]));
  }, []);

  return (
    <div className="catalog">
      <h1>All Courses</h1>
      <div className="card-grid">
        {courses.map(c => (
          <CourseCard key={c._id} course={c} />
        ))}
      </div>
    </div>
  );
}
