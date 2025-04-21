import { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterForm.css'

export default function RegisterForm({ darkMode }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username.trim()) newErrors.username = 'Name required';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';
    if (formData.password.length < 8) newErrors.password = 'Password too short';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords mismatch';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Hi");
      console.log('Registration data:', formData);
      // Submission logic
    }
  };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="left-design">
        <div className="register-text">CREATE ACCOUNT</div>
      </div>

      <div className="form-container">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label className="label">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input-field"
              />
              {errors.username && <div className="error-message">{errors.username}</div>}
            </div>

            <div className="input-container">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="input-container">
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <div className="input-container">
              <label className="label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-field"
              />
              {errors.confirmPassword && (
                <div className="error-message">{errors.confirmPassword}</div>
              )}
            </div>

            <button type="submit" className="submit-button">
              Register
            </button>
          </form>

          <div className="auth-link">
            Already have an account? <Link to="/signin" className="link">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
