const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');

// GET semua produk aktif (Public)
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products WHERE is_active = true ORDER BY display_order ASC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET semua produk termasuk tidak aktif (Admin)
router.get('/all', authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products ORDER BY display_order ASC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST produk baru (Admin)
router.post('/', authenticateToken, async (req, res) => {
    const { id, title, description, url, image_url, category_id, is_active, display_order } = req.body;
    try {
        const newId = id || require('crypto').randomUUID();
        await db.query(
            'INSERT INTO products (id, title, description, url, image_url, category_id, is_active, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [newId, title, description, url, image_url, category_id, is_active ?? true, display_order ?? 0]
        );
        res.status(201).json({ message: 'Product created', id: newId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT edit produk (Admin)
router.put('/:id', authenticateToken, async (req, res) => {
    const { title, description, url, image_url, category_id, is_active, display_order } = req.body;
    try {
        await db.query(
            'UPDATE products SET title=?, description=?, url=?, image_url=?, category_id=?, is_active=?, display_order=? WHERE id=?',
            [title, description, url, image_url, category_id, is_active, display_order, req.params.id]
        );
        res.json({ message: 'Product updated' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE produk (Admin)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await db.query('DELETE FROM products WHERE id=?', [req.params.id]);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
