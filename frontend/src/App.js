import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav style={{
        backgroundColor: '#333',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ color: 'white', margin: 0 }}>SecureConnect</h2>
        <ul style={{
          listStyleType: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          gap: '20px'
        }}>
          <li><Link to="/" style={navLinkStyle}>Home</Link></li>
          <li><Link to="/dashboard" style={navLinkStyle}>Dashboard</Link></li>
          <li><Link to="/signup" style={navLinkStyle}>Signup</Link></li>
          <li><Link to="/login" style={navLinkStyle}>Login</Link></li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

// Navigation link styles
const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
};

// Home Page Component
const Home = () => {
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '50px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Welcome to SecureConnect!</h1>
      <p>Your secure and reliable authentication system.</p>
    </div>
  );
};

export default App;
