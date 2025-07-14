import { useState, useEffect } from 'react';
import axios from '../../utils/axios'
import './Profile.css';
import defaultProfile from '../../assets/image.png';

export default function Profile() {
  const [info, setInfo] = useState({
    name: '',
    email: '',
    photo: defaultProfile,
    courses: 0,
    students: 0,
  });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/instructor/profile');
        setInfo({
          name: data.name,
          email: data.email,
          photo: data.photo || defaultProfile,
          courses: data.coursesCount,
          students: data.studentsCount,
        });
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  /* ───────────────── Change password ───────────────── */
  const handlePwd = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/instructor/profile/password', { password: newPassword });
      alert('Password updated');
      setNewPassword('');
    } catch (err) {
      alert(err.response?.data?.message || 'Password update failed');
    }
  };

  /* ───────────────── Upload new photo ───────────────── */
  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('photo', file);
    try {
      const { data } = await axios.put('/api/instructor/profile/photo', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setInfo((prev) => ({ ...prev, photo: data.photoUrl }));
    } catch (err) {
      alert(err.response?.data?.message || 'Photo upload failed');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="img-wrapper">
          <img src={info.photo} alt="profile" className="profile-img" />
          <input
            type="file"
            accept="image/*"
            className="img-input"
            onChange={handlePhoto}
            title="Change profile photo"
          />
        </div>
        <div>
          <h1 className="profile-name">{info.name}</h1>
          <p className="profile-email">{info.email}</p>
        </div>
      </div>

      <div className="counts-grid">
        <div className="count-box blue">
          <span className="count-number">{info.courses}</span>
          <span className="count-label">Courses</span>
        </div>
        <div className="count-box green">
          <span className="count-number">{info.students}</span>
          <span className="count-label">Students</span>
        </div>
      </div>

      <form onSubmit={handlePwd} className="pwd-form">
        <h2 className="section-title">Change Password</h2>
        <div className="pwd-row">
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}
