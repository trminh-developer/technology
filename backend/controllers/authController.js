const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, password, email, name, phone } = req.body;
        
        // Kiểm tra user tồn tại
        const userCheck = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Tài khoản đã tồn tại' });
        }

        const hashed = await bcrypt.hash(password, 10);
        
        // Insert bằng Raw SQL
        const result = await pool.query(
            'INSERT INTO users (username, password, email, name, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, role',
            [username, hashed, email, name, phone]
        );
        
        res.json({ message: 'Đăng ký thành công', user: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) return res.status(400).json({ error: 'Sai tài khoản hoặc mật khẩu' });
        if (user.status !== 'Active') return res.status(403).json({ error: 'Tài khoản bị khóa' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ error: 'Sai tài khoản hoặc mật khẩu' });

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.SECRET_KEY || 'novatech_super_secret_key',
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Đăng nhập thành công',
            token,
            user: { id: user.id, username: user.username, role: user.role, avatar: user.avatar }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

const profile = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, username, email, name, phone, role, status, avatar FROM users WHERE id = $1',
            [req.user.id]
        );
        
        if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

module.exports = { register, login, profile };
