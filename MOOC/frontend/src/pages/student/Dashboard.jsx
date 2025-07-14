import { Outlet } from 'react-router-dom';
import './StudentDashboard.css';

export default function StudentDashboard() {
  return (
    <div className="student-dashboard">
      <Outlet />
    </div>
  );
}