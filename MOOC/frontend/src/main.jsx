import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Register from './pages/auth/Register.jsx';
import Login from './pages/auth/Login.jsx';

import Dashboard from './pages/instructor/Dashboard.jsx';
import MyCourses from './pages/instructor/MyCourses.jsx';
import CourseForm from './components/instructor/CourseForm.jsx';
import Profile from './pages/instructor/Profile.jsx';

import StudentDashboard from './pages/student/Dashboard.jsx';
import Catalog from './pages/student/Catalog.jsx';
import CoursePlayer from './pages/student/CoursePlayer.jsx';

import RequireAuth from './components/RequireAuth.jsx';
import axios, { setAuthToken } from './utils/axios';

// Restore token into Axios on refresh
const token = localStorage.getItem('token');
if (token) setAuthToken(token);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Instructor routes (protected) */}
        <Route element={<RequireAuth />}>
          <Route path="/instructor" element={<Dashboard />}>
            <Route path="courses" element={<MyCourses />} />
            <Route path="upload" element={<CourseForm />} />
            <Route path="profile" element={<Profile />} />
            <Route index element={<Navigate to="courses" />} />
          </Route>
        </Route>

        {/* Student routes (protected) */}
        <Route element={<RequireAuth />}>
          <Route path="/student" element={<StudentDashboard />}>
            <Route index element={<Catalog />} />
            <Route path="player/:id" element={<CoursePlayer />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
