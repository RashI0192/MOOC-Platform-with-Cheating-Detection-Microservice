import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PasswordStrengthBar from '../../components/PasswordStrengthBar';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    let s = 0;
    const pw = form.password;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    setStrength(s);
  }, [form.password]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (strength < 4) return alert('Password not strong enough');
    if (form.password !== form.confirmPassword)
      return alert('Passwords do not match');
    try {
      await axios.post('/api/auth/register', form);
      alert('Account created! You may login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Create account</h1>

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
          <PasswordStrengthBar password={form.password} />
        </div>

        {strength === 4 && (
          <div className="form-group">
            <label>Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <span>I am a...</span>
          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={form.role === 'student'}
              onChange={handleChange}
            /> Student
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="instructor"
              checked={form.role === 'instructor'}
              onChange={handleChange}
            /> Instructor
          </label>
        </div>

        <button type="submit" disabled={strength < 4}>Sign up</button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;