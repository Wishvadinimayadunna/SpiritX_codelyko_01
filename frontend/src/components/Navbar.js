import React from 'react';

const NavBar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav style={{ backgroundColor: '#333', padding: '1rem' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
        <li style={{ display: 'inline', marginRight: '20px' }}><a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a></li>
        <li style={{ display: 'inline', marginRight: '20px' }}><a href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</a></li>
        <li style={{ display: 'inline', marginRight: '20px' }}><a href="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</a></li>
        <li style={{ display: 'inline' }}><button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;

