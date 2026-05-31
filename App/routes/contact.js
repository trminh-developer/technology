const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Vui lòng điền đủ thông tin!' });
        }

        await Contact.create({ name, email, message });
        
        res.status(201).json({ message: 'Đã nhận thông tin liên hệ thành công!' });
    } catch (error) {
        console.error('Lỗi gửi liên hệ:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

module.exports = router;
