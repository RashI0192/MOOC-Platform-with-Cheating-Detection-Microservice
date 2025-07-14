import { NavLink, Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Instructor Panel</h2>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="courses"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
            }
          >
            My Courses
          </NavLink>
          <NavLink
            to="upload"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
            }
          >
            Upload Course
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
            }
          >
            Profile
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
} 

