require('dotenv').config();
const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const settingsRoutes = require('./routes/settings');

const app = express();
// WAJIB: Port harus 7860 untuk Hugging Face
const PORT = process.env.PORT || 7860;

app.use(cors());
app.use(express.json());

// Routes Terpusat
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/settings', settingsRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.json({
    message: 'Portal API is running on Hugging Face!',
    version: '1.0'
  });
});

// Start Server - Gunakan 0.0.0.0 agar bisa diakses dari luar container
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});