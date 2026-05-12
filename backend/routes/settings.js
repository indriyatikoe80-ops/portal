const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');

// GET settings (Public)
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM site_settings');
        const settings = {};
        rows.forEach(r => {
            settings[r.setting_key] = r.setting_value;
        });
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT update setting (Admin)
router.put('/', authenticateToken, async (req, res) => {
    const { setting_key, setting_value } = req.body;
    try {
        await db.query('UPDATE site_settings SET setting_value = ? WHERE setting_key = ?', [setting_value, setting_key]);
        res.json({ message: 'Setting updated' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
