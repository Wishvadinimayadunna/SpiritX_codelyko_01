// frontend/components/NavBar.js
import React from 'react';

const NavBar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login after logout
  };

  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/login">Login</a></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;
