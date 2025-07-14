import { useEffect, useState } from 'react';
import axios from '../../utils/axios';

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/instructor/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseClick = async (courseId) => {
    setSelectedCourse(courseId);
    setStudents([]);
    setStudentsLoading(true);
    try {
      const res = await axios.get(`/api/instructor/courses/${courseId}/students`);
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setStudentsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Uploaded Courses</h1>

      {loading ? (
        <p className="text-gray-500">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-600">No courses uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="rounded-xl shadow p-4 border border-gray-200 cursor-pointer hover:shadow-md transition"
              onClick={() => handleCourseClick(course._id)}
            >
              {course.thumbnail ? (
                <img
                  src={`/uploads/${course.thumbnail}`}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 mb-2">
                  No Thumbnail
                </div>
              )}
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-600">
                {course.studentCount} student{course.studentCount !== 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Student List */}
      {selectedCourse && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Enrolled Students</h2>
          {studentsLoading ? (
            <p className="text-gray-500">Loading students...</p>
          ) : students.length === 0 ? (
            <p className="text-gray-500">No students enrolled yet.</p>
          ) : (
            <ul className="list-disc pl-6 space-y-1">
              {students.map((s, idx) => (
                <li key={idx}>
                  {s.username} –{' '}
                  {s.completed ? (
                    <span className="text-green-600">Completed ✅</span>
                  ) : (
                    <span className="text-yellow-600">In Progress ⏳</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
