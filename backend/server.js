const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const sequelize = require('./config/db');

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

// Tự động đồng bộ database
sequelize.sync({ alter: true }).then(async () => {
    console.log('✅ Database synced with Supabase PostgreSQL!');
    
    // Tạo sẵn Admin nếu chưa có
    const User = require('./models/User');
    const bcrypt = require('bcrypt');
    const adminExists = await User.findOne({ where: { username: 'admin' } });
    
    if (!adminExists) {
        const hashed = await bcrypt.hash('123456', 10);
        await User.create({
            username: 'admin',
            password: hashed,
            role: 'Admin',
            status: 'Active'
        });
        console.log('✅ Tạo tài khoản admin mặc định: admin / 123456');
    }

    app.listen(PORT, () => {
        console.log(`🚀 Clean Backend chạy tại: http://localhost:${PORT}`);
    });
}).catch(err => console.error('❌ Lỗi sync DB:', err));
