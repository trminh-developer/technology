const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Truy cập bị từ chối' });

    jwt.verify(token, process.env.SECRET_KEY || 'novatech_super_secret_key', (err, user) => {
        if (err) return res.status(403).json({ error: 'Token không hợp lệ hoặc đã hết hạn' });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
