const express = require('express');
const cors = require('cors'); // Tambahkan ini
const app = express();
const PORT = 7860;

// Middleware
app.use(cors()); // Izinkan akses dari domain luar (Frontend)
app.use(express.json()); // Agar backend bisa membaca data JSON dari POST request

// Endpoint Utama
app.get('/', (req, res) => {
  res.json({ 
    message: "Backend Node.js berhasil berjalan di Hugging Face!",
    owner: "candrabuwana80",
    features: ["CORS Enabled", "JSON Parser"]
  });
});

// Endpoint Testing untuk Project Anda
app.get('/api/info', (req, res) => {
  res.json({ 
    system: "Express", 
    status: "Active",
    database: "Ready to connect" 
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});