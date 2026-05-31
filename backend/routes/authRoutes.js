const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    res.json({ message: 'Auth API is running' });
});

// Các API Login, Register, Profile sẽ được định nghĩa ở đây
// bằng cách gọi đến authController

module.exports = router;
