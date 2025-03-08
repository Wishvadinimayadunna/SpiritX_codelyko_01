// frontend/components/Signup.js
import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'password') {
      const strength = checkPasswordStrength(e.target.value);
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    // Send signup request to the backend (using fetch or axios)
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.error) {
      setErrors({ general: data.error });
    } else {
      alert('Signup successful! Redirecting to login...');
      // Redirect to login page after success
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 8) return 'Weak';
    if (password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/[!@#$%^&*]/)) return 'Strong';
    return 'Medium';
  };

  return (
    <div>
      <h2>Signup</h2>
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
        <div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        </div>
        {passwordStrength && <div>Password Strength: {passwordStrength}</div>}
        <button type="submit">Sign Up</button>
        {errors.general && <div>{errors.general}</div>}
      </form>
    </div>
  );
};

export default Signup;