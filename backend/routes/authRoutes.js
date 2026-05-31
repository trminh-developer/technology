const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/health', (req, res) => {
    res.json({ message: 'Auth API is running' });
});

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticateToken, authController.profile);

module.exports = router;
