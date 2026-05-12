const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Fallback darurat jika DB belum diisi (Untuk masa development)
    if (username === 'admin' && password === 'admin123') {
        const token = jwt.sign({ username: 'admin' }, process.env.JWT_SECRET || 'super_secret_key_for_portal', { expiresIn: '24h' });
        return res.json({ token, message: 'Login successful (fallback)' });
    }

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
        
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET || 'super_secret_key_for_portal', { expiresIn: '24h' });
        res.json({ token, message: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
