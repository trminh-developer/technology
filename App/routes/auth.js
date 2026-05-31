const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = 'novatech_super_secret_key';

// Đăng ký (Register)
router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        // Kiểm tra xem username đã tồn tại chưa
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Tên đăng nhập đã tồn tại!' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Tạo người dùng
        const user = await User.create({
            username,
            password: hashedPassword,
            email: email || null
        });

        res.status(201).json({ message: 'Đăng ký thành công!', user: { id: user.id, username: user.username } });
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Đăng nhập (Login)
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Tìm người dùng
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Sai tên đăng nhập hoặc mật khẩu!' });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Sai tên đăng nhập hoặc mật khẩu!' });
        }

        // Tạo token
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: 'Đăng nhập thành công!', token, user: { username: user.username, role: user.role } });
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

module.exports = router;
