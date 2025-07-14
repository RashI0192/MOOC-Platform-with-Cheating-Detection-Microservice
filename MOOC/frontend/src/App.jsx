import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="landing-container">
      <h1>Welcome to MOOC</h1>
      <p>Please log in or register to continue.</p>
      <div className="button-group">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Register</Link>
      </div>
    </div>
  );
}

export default App;

