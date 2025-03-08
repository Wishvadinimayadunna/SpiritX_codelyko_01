// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.userId = decoded.userId; // Add userId to request for access in the controller
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateToken;
