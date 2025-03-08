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

    // Send signup request to the backend
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
    <div style={containerStyle}>
      <h2 style={headingStyle}>Signup</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            style={inputStyle}
          />
          {errors.username && <span style={errorStyle}>{errors.username}</span>}
        </div>
        <div style={inputGroupStyle}>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            style={inputStyle}
          />
          {errors.password && <span style={errorStyle}>{errors.password}</span>}
        </div>
        <div style={inputGroupStyle}>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            style={inputStyle}
          />
          {errors.confirmPassword && <span style={errorStyle}>{errors.confirmPassword}</span>}
        </div>
        {passwordStrength && <div style={strengthStyle}>Password Strength: {passwordStrength}</div>}
        <button type="submit" style={buttonStyle}>Sign Up</button>
        {errors.general && <div style={errorStyle}>{errors.general}</div>}
      </form>
    </div>
  );
};

// Inline CSS Styles
const containerStyle = {
  maxWidth: '400px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f9f9f9',
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  color: '#333',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputGroupStyle = {
  marginBottom: '15px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#333',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const errorStyle = {
  color: 'red',
  fontSize: '14px',
  marginTop: '5px',
  display: 'block',
};

const strengthStyle = {
  textAlign: 'center',
  marginBottom: '10px',
  fontWeight: 'bold',
};

export default Signup;
