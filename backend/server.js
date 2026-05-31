const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const pool = require('./config/db');
const bcrypt = require('bcrypt');

// Import routes
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);

// Khởi tạo Database bằng Raw SQL
const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                name VARCHAR(255),
                phone VARCHAR(255),
                role VARCHAR(50) DEFAULT 'User',
                status VARCHAR(50) DEFAULT 'Active',
                avatar VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Database tables checked/created with Raw SQL!');

        // Check if admin exists
        const adminRes = await pool.query('SELECT * FROM users WHERE username = $1', ['admin']);
        if (adminRes.rows.length === 0) {
            const hashed = await bcrypt.hash('123456', 10);
            await pool.query(
                'INSERT INTO users (username, password, role, status) VALUES ($1, $2, $3, $4)',
                ['admin', hashed, 'Admin', 'Active']
            );
            console.log('✅ Tạo tài khoản admin mặc định: admin / 123456');
        }

        app.listen(PORT, () => {
            console.log(`🚀 Clean Raw SQL Backend chạy tại: http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Lỗi init DB:', err);
    }
};

initDB();
