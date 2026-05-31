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

// Middleware xác thực Token (Cần để lấy profile)
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Lấy thông tin Profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'username', 'email', 'role', 'status', 'name', 'phone']
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Cập nhật Profile
router.put('/profile', authenticateToken, async (req, res) => {
    try {
        const { name, username, email, phone, oldPassword, newPassword } = req.body;
        const user = await User.findByPk(req.user.id);
        
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Nếu muốn đổi mật khẩu
        if (newPassword) {
            if (!oldPassword) return res.status(400).json({ error: 'Vui lòng nhập mật khẩu cũ' });
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) return res.status(401).json({ error: 'Mật khẩu cũ không chính xác' });
            
            user.password = await bcrypt.hash(newPassword, 10);
        }

        // Cập nhật thông tin khác
        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;
        if (phone !== undefined) user.phone = phone;
        if (username !== undefined && username !== user.username) {
            const exist = await User.findOne({ where: { username } });
            if (exist) return res.status(400).json({ error: 'Username đã tồn tại' });
            user.username = username;
        }

        await user.save();
        res.json({ message: 'Cập nhật thành công', user: { name: user.name, username: user.username, email: user.email, phone: user.phone } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

module.exports = router;
