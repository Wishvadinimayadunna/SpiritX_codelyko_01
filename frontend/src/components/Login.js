// frontend/components/Login.js
import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    // Send login request to backend
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.error) {
      setErrors({ general: data.error });
    } else {
      localStorage.setItem('token', data.token); // Store token
      setLoggedIn(true);
    }
  };

  if (loggedIn) {
    return (
      <div>
        <h2>Welcome, {formData.username}!</h2>
        <button onClick={() => {
          localStorage.removeItem('token');
          setLoggedIn(false);
        }}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          {errors.username && <span>{errors.username}</span>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <button type="submit">Login</button>
        {errors.general && <div>{errors.general}</div>}
      </form>
    </div>
  );
};

export default Login;
