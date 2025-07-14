import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios, { setAuthToken } from '../../utils/axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { token, user } = (await axios.post('/api/auth/login', form)).data;
        setAuthToken(token); // Set the token for future requests
        alert(`Welcome back, ${user.username}!`);
      
      if (user.role === 'instructor') {
        navigate('/instructor');}
        else if (user.role === 'student') { 
        navigate('/student');}

      
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Login</h1>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;