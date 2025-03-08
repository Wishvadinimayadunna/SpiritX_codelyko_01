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

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.error) {
      setErrors({ general: data.error });
    } else {
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {loggedIn ? (
        <div>
          <h2>Welcome, {formData.username}!</h2>
          <button onClick={() => { localStorage.removeItem('token'); setLoggedIn(false); }}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
            <div>
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
              {errors.username && <span>{errors.username}</span>}
            </div>
            <div>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
              {errors.password && <span>{errors.password}</span>}
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
            {errors.general && <div>{errors.general}</div>}
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;

