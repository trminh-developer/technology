const express = require('express');
const cors = require('cors');
const sequelize = require('./models/db');

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Cho phép Frontend gọi API
app.use(express.json()); // Phân tích JSON từ Client
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Tự động đồng bộ database
sequelize.sync({ alter: true }).then(async () => {
    console.log('Database synced!');
    
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
        console.log('Tạo tài khoản admin mặc định: admin / 123456');
    }

    app.listen(PORT, () => {
        console.log(`🚀 Backend chạy tại: http://localhost:${PORT}`);
    });
}).catch(err => console.error('Lỗi sync DB:', err));
