const express = require('express');
const app = express();
const PORT = 7860; // Port wajib 7860 untuk Hugging Face

app.get('/', (req, res) => {
  res.json({ 
    message: "Backend Node.js berhasil berjalan di Hugging Face!",
    owner: "candrabuwana80"
  });
});

// Endpoint testing
app.get('/api/info', (req, res) => {
  res.json({ system: "Express", status: "Active" });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});