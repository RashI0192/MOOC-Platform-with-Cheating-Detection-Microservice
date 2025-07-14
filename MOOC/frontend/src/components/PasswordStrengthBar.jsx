import React, { useMemo } from 'react';
import './PasswordStrengthBar.css';

export default function PasswordStrengthBar({ password = '' }) {
  const strength = useMemo(() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  }, [password]);

  return (
    <div className="password-strength-bar">
      {[0, 1, 2, 3].map((idx) => (
        <div
          key={idx}
          className={`bar-segment ${idx < strength ? `level-${strength}` : 'inactive'}`}
        />
      ))}
    </div>
  );
}