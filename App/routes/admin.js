const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY || 'novatech_super_secret_key';

const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        if (user.role !== 'Admin') return res.status(403).json({ error: 'Access denied. Admins only.' });
        req.user = user;
        next();
    });
};

// Sử dụng middleware bảo vệ cho toàn bộ route admin
router.use(authenticateAdmin);

// Lấy danh sách Users
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'role', 'status']
        });
        
        const mappedUsers = users.map(u => ({
            id: u.id,
            name: u.username,
            email: u.email,
            role: u.role,
            status: u.status
        }));
        
        res.json(mappedUsers);
    } catch (error) {
        console.error('Lỗi lấy danh sách users:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Lấy dữ liệu thống kê
router.get('/stats', async (req, res) => {
    try {
        const total_users = await User.count();
        const active_users = await User.count({ where: { status: 'Active' } });
        
        res.json({
            total_users: total_users.toString(),
            revenue: '$1,200', // Mock revenue
            active: active_users.toString(),
            server: '15%'
        });
    } catch (error) {
        console.error('Lỗi lấy thống kê:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

module.exports = router;
