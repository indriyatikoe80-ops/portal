# Rencana Implementasi Bertahap

Dokumen ini berisi panduan teknis *step-by-step* untuk mengeksekusi pembangunan portal utama Anda.

## Fase 1: Persiapan Infrastruktur & Database (Hari 1)
1. **Aiven (Database)**:
   - Buat akun/login ke [Aiven](https://aiven.io/).
   - Buat instance MySQL baru (tersedia versi free-tier jika memenuhi syarat).
   - Simpan kredensial: Host, Port, Username, Password, Database Name.
2. **Setup Skema Database**:
   - Gunakan aplikasi klien seperti DBeaver atau HeidiSQL.
   - Sambungkan ke MySQL Aiven menggunakan kredensial di atas.
   - Jalankan script SQL yang ada di `02-database.md`.

## Fase 2: Pembangunan Backend Node.js (Hari 2)
1. **Inisialisasi Proyek Backend**:
   - Buat folder `backend`, jalankan `npm init -y`.
   - Install dependensi: `express`, `cors`, `mysql2`, `dotenv`, `jsonwebtoken`, `bcrypt`.
2. **Koneksi Database**:
   - Buat koneksi pool ke MySQL Aiven. Pastikan mengaktifkan setting SSL untuk Aiven.
3. **Pembuatan Endpoint API**:
   - Implementasikan endpoint sesuai rancangan di `04-api-spec.md`.
4. **Deploy ke Render**:
   - Buat Web Service baru di [Render](https://render.com/).
   - Hubungkan dengan repository GitHub backend Anda.
   - Setel Environment Variables (`DB_HOST`, `DB_USER`, `DB_PASS`, `JWT_SECRET`).

## Fase 3: Pembangunan Frontend React UI (Hari 3-4)
1. **Inisialisasi Frontend Utama**:
   - Di dalam folder proyek, jalankan `npx create-vite-app@latest frontend --template react` (atau `npm create vite@latest`).
   - Hapus CSS bawaan, buat `index.css` baru dengan variabel warna yang disepakati di `03-ui-ux.md`.
2. **Integrasi Desain Premium**:
   - Buat komponen `HeroSection`, `ProductGrid`, `ProductCard`, `Footer`.
   - Gunakan CSS murni atau library animasi minimalis untuk efek hover glassmorphism.
3. **Koneksi API**:
   - Gunakan `fetch` atau `axios` di dalam `useEffect` React untuk mengambil daftar produk dari Render API (contoh: `https://api-portal-anda.onrender.com/api/v1/products`).
4. **Membuat Dashboard Admin (Sederhana)**:
   - Buat route tersembunyi (contoh menggunakan React Router: `/login` dan `/admin`).
   - Buat form untuk menambah tautan produk baru.

## Fase 4: Pengujian & Penyelesaian (Hari 5)
1. **Uji Responsivitas**:
   - Buka di mode tampilan mobile, pastikan tidak ada elemen yang terpotong.
2. **Uji Kinerja & SEO**:
   - Pastikan tag `<title>` dan `<meta description>` sudah dimasukkan dalam `index.html`.
3. **Deploy Frontend**:
   - Deploy frontend ke layanan statis seperti **Netlify**, **Vercel**, atau **Render Static Site**.

## Struktur Folder Akhir yang Direncanakan
```text
portal/
 ├── docs/          (Dokumen perancangan ini)
 ├── backend/       (Express API, deploy ke Render)
 └── frontend/      (React App, UI Utama Portal)
```
