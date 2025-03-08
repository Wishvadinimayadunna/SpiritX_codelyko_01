// frontend/components/Dashboard.js
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data from backend using the token
      fetch('/api/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error('Error fetching user data:', error));
    } else {
      window.location.href = '/login'; // Redirect to login if no token
    }
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {userData ? (
        <div>
          <p>Welcome, {userData.username}!</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;