# Master Plan Pengembangan Web Portal Utama

Dokumen ini adalah panduan langkah demi langkah (checklist) untuk memastikan seluruh tahap pengerjaan Web Portal berjalan sistematis, rapi, dan terukur hingga selesai dan di-deploy.

---

## ✅ FASE 1: Setup Infrastruktur Awal (SELESAI)
- [x] Mendefinisikan konsep, UI/UX, dan arsitektur web (`docs/`).
- [x] Menulis skema database awal (`docs/init_database.sql`).
- [x] Inisialisasi folder `frontend` dengan React (Vite) & install *dependencies*.
- [x] Inisialisasi folder `backend` dengan Express.js & install *dependencies*.
- [x] Setup struktur file `backend` (`index.js`, `.env`, `.gitignore`).

---

## 🚧 FASE 2: Pengembangan Backend & Database (API)
**Tujuan**: Menyediakan data yang dinamis (Produk, Visi/Misi) untuk ditampilkan di Frontend.
- [ ] **Langkah 2.1**: Buat instance MySQL di **Aiven** dan import `init_database.sql`.
- [x] **Langkah 2.2**: Sambungkan backend Express.js ke Aiven menggunakan `mysql2/promise` (buat file `backend/config/db.js`).
- [x] **Langkah 2.3**: Buat endpoint Publik (tanpa autentikasi):
  - `GET /api/v1/products` -> Mengambil daftar web produk yang aktif.
  - `GET /api/v1/settings` -> Mengambil pengaturan (Visi, Misi, Profil, dll).
- [x] **Langkah 2.4**: Buat endpoint Autentikasi (`POST /api/v1/auth/login`) menggunakan `bcrypt` & `jsonwebtoken` (JWT).
- [x] **Langkah 2.5**: Buat endpoint Privat (CRUD khusus Admin dengan JWT):
  - `POST /api/v1/products` -> Tambah tautan produk baru.
  - `PUT /api/v1/products/:id` -> Edit produk.
  - `DELETE /api/v1/products/:id` -> Hapus produk.

---

## 🚧 FASE 3: Pengembangan Frontend (UI Publik / Landing Page)
**Tujuan**: Membangun tampilan utama web portal yang sangat profesional, elegan, bergaya *dark mode* dan *glassmorphism*.
- [x] **Langkah 3.1**: Setup *Design System* di React (buat *Variables* CSS untuk warna neon, font `Inter/Outfit`, utility global di `index.css`).
- [x] **Langkah 3.2**: Buat Komponen **Header / Navbar** (Responsif dengan Hamburger Menu di Mobile).
- [x] **Langkah 3.3**: Buat Komponen **Hero Section** (Animasi pembuka, teks tagline "Satu Portal, Beragam Solusi Digital").
- [x] **Langkah 3.4**: Buat Komponen **Profil & Visi Misi** (*Bento-grid* atau *Split-screen* dengan efek transisi saat di-scroll).
- [x] **Langkah 3.5**: Buat Komponen **Product Grid & Card** (Desain kartu produk bergaya *glassmorphism* dengan efek *glowing* dan *hover* membesar).
- [x] **Langkah 3.6**: Integrasi API: Hubungkan `Product Grid` dan `Profil` agar mengambil data langsung dari API Backend (menggunakan `useEffect` dan `fetch`/`axios`).
- [x] **Langkah 3.7**: Buat Komponen **Footer** yang elegan.

---

## 🚧 FASE 4: Pengembangan Dashboard Admin (CMS Internal)
**Tujuan**: Membuat halaman khusus yang tersembunyi untuk mengatur data produk.
- [x] **Langkah 4.1**: Setup React Router di Frontend (contoh: rute `/` untuk publik, `/login` dan `/admin` untuk area privat).
- [x] **Langkah 4.2**: Buat Halaman **Login** sederhana dengan fungsionalitas memanggil API `/auth/login` dan menyimpan *Token JWT* di LocalStorage.
- [x] **Langkah 4.3**: Buat Halaman **Dashboard Admin** (Dilindungi/Protected Route - hanya bisa diakses jika ada token).
- [x] **Langkah 4.4**: Buat form untuk menambah dan mengedit Produk. Input meliputi: Judul, Deskripsi, URL Tujuan, dan Lokasi Gambar Thumbnail.

---

## 🚧 FASE 5: Integrasi, Pengujian, & Finalisasi (Polishing)
**Tujuan**: Memastikan tidak ada *bug*, tampilan konsisten di semua layar, dan optimalisasi.
- [ ] **Langkah 5.1**: Lakukan *Testing Responsivitas* pada simulator HP, Tablet, dan Desktop layar lebar.
- [ ] **Langkah 5.2**: Tambahkan mikro-animasi (contoh: partikel melayang, transisi antar halaman).
- [ ] **Langkah 5.3**: Pengujian End-to-End: Coba login sebagai admin -> tambah produk -> cek apakah produk langsung muncul di halaman publik utama.
- [ ] **Langkah 5.4**: Optimasi meta tag SEO (Title, Description) di `index.html` Frontend.

---

## 🚧 FASE 6: Deployment (Go Live)
**Tujuan**: Mengunggah seluruh sistem ke server agar bisa diakses oleh seluruh dunia.
- [ ] **Langkah 6.1**: **Database**: Pastikan MySQL di Aiven sudah dikunci dengan *password* kuat dan siap untuk produksi.
- [ ] **Langkah 6.2**: **Backend**: Deploy kode backend Express.js ke **Render.com**. Set environment variables di Render (URL Database Aiven, JWT Secret).
- [ ] **Langkah 6.3**: Update *Base URL* API di Frontend React untuk mengarah ke link Render (misal: `https://api-portal.onrender.com`).
- [ ] **Langkah 6.4**: **Frontend**: Jalankan perintah `npm run build` di folder Frontend.
- [ ] **Langkah 6.5**: Upload (Push) hasil build frontend beserta gambar-gambar `public/images` ke repositori **GitHub Pages**. Konfigurasi Custom Domain (opsional).

🎉 **Proyek Selesai & Portal Berhasil Dirilis!** 🚀
