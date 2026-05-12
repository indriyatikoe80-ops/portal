require('dotenv').config();
const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const settingsRoutes = require('./routes/settings');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes Terpusat
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/settings', settingsRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Portal API is running! v1.0' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
