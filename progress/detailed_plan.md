# Rencana Terperinci (Codebase vs Docs)

## 1. Analisis & Perbandingan
- **Dokumentasi**: `docs/01-concept.md` awalnya menyebutkan Render, namun telah diperbaiki menjadi **Hugging Face Spaces** untuk diselaraskan dengan dokumen lainnya (`05-implementation-plan.md` dan `06-huggingface-integration.md`). Database menggunakan MySQL di **Aiven**. Dokumen sudah lengkap dan tidak ada lagi yang bertentangan.
- **Backend Codebase**:
  - `package.json` sudah memiliki package `@huggingface/inference`, `mysql2`, `jsonwebtoken`, `express`, dll. Sesuai dengan spek.
  - Terdapat file `Dockerfile` untuk deployment Hugging Face Spaces.
  - Terdapat file route `ai.js`, `auth.js`, `products.js`, `settings.js`. Sesuai dengan dokumen `04-api-spec.md`.
- **Frontend Codebase**:
  - Menggunakan React + Vite sesuai dokumen.
  - Halaman `Home.jsx`, `Login.jsx`, dan `Admin.jsx` sudah ada.
  - Namun, UI/UX (khususnya untuk halaman form Login dan Admin Dashboard) masih perlu di-upgrade besar-besaran agar tampil "benar-benar keren, estetik, premium, dan profesional" karena ini adalah representasi utama (Hub) dari semua produk.

## 2. Rencana Tindakan (Action Plan)

### Langkah 1: UI/UX Form Overhaul (Fokus Saat Ini)
- **Login Page**:
  - Membuat efek *Glassmorphism* tingkat lanjut dengan gradient border, blur tebal, box-shadow yang dramatis, dan animasi *floating*.
  - Menambahkan *micro-interactions* pada input form (animasi label, border glow saat focus).
  - Menambahkan partikel/background dinamis untuk *wow-factor*.
- **Admin Dashboard**:
  - Mempercantik form tambah/edit produk dengan *layout grid*, *glass cards*, ikon, dan transisi smooth.
  - Membuat tabel produk tampak lebih profesional (hover effects, text gradient, status pills).

### Langkah 2: Backend & Database Verification
- Memastikan koneksi MySQL (Aiven) di `backend/config/db.js` berjalan lancar.
- Memastikan token JWT bekerja dengan baik di frontend.

### Langkah 3: Finalisasi & Deployment
- Tes fungsional CRUD pada Admin Dashboard.
- Deploy backend ke Hugging Face Spaces.
- Deploy frontend.
