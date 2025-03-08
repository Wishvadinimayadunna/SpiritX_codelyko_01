// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

// Protected route to get user data
router.get('/profile', authenticateToken, userController.getUserData);

module.exports = router;
