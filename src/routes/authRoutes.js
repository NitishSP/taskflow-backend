const express = require('express');
const router = express.Router();
const { register, login, refresh, logout, getProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

// =========================================================
// PUBLIC ROUTES (No authentication required) - /api/v1/auth
// =========================================================

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);

// ==========================================================
// PROTECTED ROUTES (Authentication required) - /api/v1/auth/
// ==========================================================

router.get('/profile', protect, getProfile);

module.exports = router;
