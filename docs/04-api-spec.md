# Spesifikasi API Backend (Node.js & Express)

Backend berfungsi sebagai jembatan antara Database MySQL (Aiven) dan Web Frontend (React). Backend akan berjalan online di **Hugging Face Spaces** dengan integrasi Hugging Face Inference API untuk kemampuan AI.

## Base URL
`https://username-portal-api.hf.space/api/v1`

## Otentikasi
Sebagian besar endpoint manajemen memerlukan JWT (JSON Web Token).

---

### 1. Endpoint Otentikasi (Auth)

**POST `/auth/login`**
- **Fungsi**: Verifikasi username & password admin, mengembalikan JWT.
- **Body**: `{ "username": "admin", "password": "password_rahasia" }`
- **Response**: `{ "token": "eyJhb...", "user": { "username": "admin" } }`

---

### 2. Endpoint Produk Publik (Tanpa Token)

**GET `/products`**
- **Fungsi**: Mengambil semua data produk yang aktif (untuk ditampilkan di halaman utama).
- **Query**: `?active=true`
- **Response**: Array of product objects.

**GET `/settings`**
- **Fungsi**: Mengambil pengaturan web (judul, deskripsi web).
- **Response**: Object of settings.

---

### 3. Endpoint Manajemen Produk (Perlu JWT di Header)
*Header: `Authorization: Bearer <token>`*

**POST `/products`**
- **Fungsi**: Menambahkan web produk baru.
- **Body**: `{ "title": "Web Baru", "description": "...", "url": "https://...", "image_url": "..." }`

**PUT `/products/:id`**
- **Fungsi**: Memperbarui informasi produk.

**DELETE `/products/:id`**
- **Fungsi**: Menghapus produk dari daftar portal.

---

### 4. Endpoint AI / Machine Learning (Hugging Face)
Endpoints ini memanfaatkan Hugging Face API untuk automasi dan AI features.

**POST `/ai/generate-description`** (Publik atau Autentikasi Admin)
- **Fungsi**: Generate deskripsi produk otomatis berdasarkan judul.
- **Body**: `{ "product_title": "Nama Produk", "category": "Kategori" }`
- **Response**: `{ "success": true, "generated_description": "..." }`

**POST `/ai/classify-category`** (Admin)
- **Fungsi**: Klasifikasi otomatis kategori produk dari deskripsi.
- **Body**: `{ "description": "Deskripsi produk..." }`
- **Response**: `{ "success": true, "category": "Pendidikan", "confidence": 0.95 }`

**POST `/ai/summarize`** (Admin)
- **Fungsi**: Singkatkan deskripsi panjang menjadi ringkas.
- **Body**: `{ "text": "Deskripsi panjang..." }`
- **Response**: `{ "success": true, "summary": "..." }`

*Dokumentasi lengkap: lihat `06-huggingface-integration.md`*

---

## Integrasi Database di Node.js
Disarankan menggunakan **mysql2/promise** untuk terhubung dengan Aiven. Koneksi Aiven biasanya mensyaratkan SSL, sehingga konfigurasi di Node.js perlu menyertakan opsi SSL `rejectUnauthorized: true` (dengan sertifikat CA Aiven) atau `false` tergantung mode Aiven.

## Integrasi Hugging Face
Backend menggunakan **@huggingface/inference** library untuk akses model AI cloud. Pastikan:
1. Setup token API di file `.env` (`HUGGINGFACE_API_TOKEN`)
2. Install package: `npm install @huggingface/inference`
3. Buat file config `backend/config/huggingface.js`

Lihat `06-huggingface-integration.md` untuk detail implementasi.
