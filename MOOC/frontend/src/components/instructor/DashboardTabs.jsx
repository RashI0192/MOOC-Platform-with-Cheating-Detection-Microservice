import { NavLink } from 'react-router-dom';
import './DashboardTabs.css';

export default function DashboardTabs() {
  // utility so we don’t repeat ourselves
  const tabClass = ({ isActive }) =>
    `tab ${isActive ? 'active' : ''}`;        // ← add “active” when selected

  return (
    <nav className="tabs">
      <NavLink to="courses"  end          className={tabClass}>
        My Courses
      </NavLink>

      <NavLink to="upload"                 className={tabClass}>
        Upload Course
      </NavLink>

      <NavLink to="profile"                className={tabClass}>
        Personal Info
      </NavLink>
    </nav>
  );
}
