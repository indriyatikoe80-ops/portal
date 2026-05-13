# Integrasi Hugging Face di Backend

Dokumen ini menjelaskan cara mengintegrasikan Hugging Face ke dalam backend Node.js/Express untuk menambahkan kemampuan AI/ML ke portal.

## 1. Pengenalan Hugging Face

Hugging Face menyediakan API cloud untuk akses model AI pre-trained tanpa perlu host model sendiri:
- **Text Generation**: Untuk membuat konten otomatis (deskripsi produk, judul, dll)
- **Text Classification**: Untuk kategorisasi otomatis produk
- **Summarization**: Untuk membuat ringkasan deskripsi panjang
- **Sentiment Analysis**: Untuk analisis sentimen feedback

## 2. Setup Hugging Face

### 2.1 Daftar & Dapatkan API Token
1. Kunjungi [Hugging Face](https://huggingface.co/)
2. Buat akun atau login
3. Pergi ke Settings > Access Tokens
4. Generate token baru (ambil token untuk **Inference API**)
5. Simpan token di file `.env` backend:
   ```
   HUGGINGFACE_API_TOKEN=hf_xxxxxxxxxxxx
   ```

### 2.2 Install Dependensi Backend
```bash
npm install @huggingface/inference dotenv
```

## 3. Model AI yang Direkomendasikan

### Untuk Portal Anda:
- **Text Generation**: `gpt2` atau `EleutherAI/gpt-j-6b` → Generate deskripsi produk otomatis
- **Text Classification**: `facebook/bart-large-mnli` → Kategorisasi produk otomatis
- **Summarization**: `facebook/bart-large-cnn` → Buat summary deskripsi panjang jadi pendek

## 4. Contoh Implementasi Backend

### 4.1 Setup Koneksi Hugging Face (`backend/config/huggingface.js`)

```javascript
import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const client = new HfInference(process.env.HUGGINGFACE_API_TOKEN);

export default client;
```

### 4.2 Tambahkan Endpoint untuk AI Features

#### Endpoint 1: Generate Deskripsi Produk Otomatis
**POST `/api/v1/ai/generate-description`**
- **Fungsi**: Generate deskripsi produk berdasarkan judul/kategori
- **Body**: 
  ```json
  {
    "product_title": "Aplikasi Edukasi Anak",
    "category": "Pendidikan"
  }
  ```
- **Response**: 
  ```json
  {
    "generated_description": "Aplikasi edukasi anak yang dirancang dengan..."
  }
  ```

#### Endpoint 2: Klasifikasi Otomatis Kategori
**POST `/api/v1/ai/classify-category`**
- **Fungsi**: Tentukan kategori produk berdasarkan deskripsi
- **Body**: 
  ```json
  {
    "description": "Web app untuk belajar programming..."
  }
  ```
- **Response**: 
  ```json
  {
    "category": "Pendidikan",
    "confidence": 0.95
  }
  ```

#### Endpoint 3: Summarize Deskripsi Panjang
**POST `/api/v1/ai/summarize`**
- **Fungsi**: Singkatkan deskripsi panjang menjadi 1-2 baris
- **Body**: 
  ```json
  {
    "text": "Aplikasi edukasi anak yang sangat panjang ini dirancang untuk..."
  }
  ```
- **Response**: 
  ```json
  {
    "summary": "Aplikasi edukasi anak inovatif dengan fitur interaktif..."
  }
  ```

### 4.3 Contoh Route Handler (`backend/routes/ai.js`)

```javascript
import express from "express";
import client from "../config/huggingface.js";

const router = express.Router();

// Generate Description
router.post("/generate-description", async (req, res) => {
  try {
    const { product_title, category } = req.body;
    
    const prompt = `Buat deskripsi singkat (50-100 kata) untuk produk bernama "${product_title}" yang termasuk kategori "${category}". Deskripsi harus menarik dan profesional.`;
    
    const response = await client.textGeneration({
      model: "gpt2",
      inputs: prompt,
      parameters: {
        max_new_tokens: 100,
      },
    });

    res.json({
      success: true,
      generated_description: response[0].generated_text.split(prompt)[1]?.trim() || response[0].generated_text,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Classify Category
router.post("/classify-category", async (req, res) => {
  try {
    const { description } = req.body;
    
    const categories = ["Pendidikan", "Utilitas", "Hiburan", "Produktivitas"];
    
    const response = await client.zeroShotClassification({
      model: "facebook/bart-large-mnli",
      inputs: description,
      parameters: {
        candidate_labels: categories,
      },
    });

    res.json({
      success: true,
      category: response.labels[0],
      confidence: response.scores[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Summarize Text
router.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    
    const response = await client.summarization({
      model: "facebook/bart-large-cnn",
      inputs: text,
      parameters: {
        max_length: 100,
        min_length: 30,
      },
    });

    res.json({
      success: true,
      summary: response.summary_text,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

## 5. Integrasi ke `backend/index.js`

```javascript
import aiRoutes from "./routes/ai.js";

// Tambahkan ke routing
app.use("/api/v1/ai", aiRoutes);
```

## 6. Penggunaan di Frontend (Opsional)

Admin dapat memanfaatkan endpoint AI untuk:
- **Auto-generate deskripsi** saat menambah produk baru
- **Suggest kategori** otomatis
- **Validate & improve** deskripsi yang sudah ada

Contoh di React form:
```javascript
const generateDescription = async () => {
  const response = await fetch("http://localhost:5000/api/v1/ai/generate-description", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product_title: title,
      category: category,
    }),
  });
  
  const data = await response.json();
  setDescription(data.generated_description);
};
```

## 7. Catatan Penting

### Biaya
- Hugging Face Inference API memiliki **free tier** dengan batasan (rate limit, request per bulan)
- Untuk produksi, pertimbangkan **Hugging Face Pro** atau self-host model jika traffic tinggi

### Alternatif Self-Host
Jika ingin bebas biaya tanpa rate limit, bisa self-host model menggunakan:
- **Ollama** (lokal atau di server VPS)
- **LM Studio** (GUI sederhana)
- Model open-source dari Hugging Face

### Latency
- Hugging Face API memiliki cold-start ~2-5 detik untuk first request
- Gunakan caching atau trigger periodic requests untuk "warm-up" model

---

**Dokumentasi ini melengkapi `04-api-spec.md` dan `05-implementation-plan.md`.**
