# Spesifikasi API Backend (Node.js & Express)

Backend berfungsi sebagai jembatan antara Database MySQL (Aiven) dan Web Frontend (React). Backend akan berjalan di **Render**.

## Base URL
`https://api-portal-anda.onrender.com/api/v1`

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

## Integrasi Database di Node.js
Disarankan menggunakan **Sequelize** ORM atau **mysql2/promise** untuk terhubung dengan Aiven. Koneksi Aiven biasanya mensyaratkan SSL, sehingga konfigurasi di Node.js perlu menyertakan opsi SSL `rejectUnauthorized: true` (dengan sertifikat CA Aiven) atau `false` tergantung mode Aiven.
