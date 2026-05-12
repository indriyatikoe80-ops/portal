# Konsep Utama Web Portal

## 1. Profil, Visi, dan Misi
Web Portal ini tidak hanya berfungsi sebagai "Hub Utama" atau etalase sentral untuk produk web Anda, tetapi juga sebagai cerminan identitas dan profesionalisme Anda.

**Profil:**
Menyajikan informasi singkat tentang latar belakang, keahlian, dan dedikasi dalam membangun solusi digital inovatif yang bermanfaat bagi masyarakat (mulai dari aplikasi untuk anak usia dini hingga dashboard tata kelola lingkungan).

**Visi:**
Menjadi pusat ekosistem digital terdepan yang menghasilkan produk-produk teknologi yang inklusif, edukatif, solutif, dan profesional.

**Misi:**
1. Mengembangkan aplikasi yang tepat guna dan mudah diakses oleh berbagai kalangan.
2. Memberikan pengalaman pengguna (UX) yang premium, estetik, dan berkesan.
3. Terus berinovasi dalam teknologi web untuk memecahkan masalah praktis sehari-hari.

## 2. Fitur Utama
1. **Hero Section Dinamis**: Animasi pembuka yang keren dan profesional dengan pesan utama (value proposition).
2. **Katalog Produk Terpusat**: Grid kartu produk bergaya modern (glassmorphism/3D hover) dengan tombol akses langsung ke masing-masing web produk.
3. **Sistem Manajemen Konten (CMS) Sederhana**: Dashboard admin untuk menambah, mengedit, atau menghapus tautan produk beserta gambar dan deskripsinya tanpa perlu mengubah kode.
4. **Desain Super Responsif & Premium**: Tampilan optimal dari layar HP hingga Desktop dengan transisi yang mulus.
5. **SEO & Kinerja Cepat**: Pengoptimalan metatag untuk pencarian dan waktu muat yang sangat cepat.

## 3. Tech Stack (Sesuai Rencana)
- **Frontend Utama**: React.js (menggunakan Vite untuk performa build yang super cepat).
- **Styling**: Vanilla CSS dengan variabel khusus (atau Framer Motion untuk animasi premium tingkat lanjut jika disetujui).
- **Backend / API**: Node.js dengan Express.js. Dihosting di **Render**.
- **Database**: MySQL. Dihosting di **Aiven**.
- **Penyimpanan Gambar / Hosting Frontend**: GitHub Pages sangat direkomendasikan untuk hosting statis Frontend (React) secara gratis. Karena jumlah gambar tidak banyak, file gambar dapat disimpan langsung di dalam repositori GitHub (di folder `public/images`), sehingga tidak memerlukan layanan pihak ketiga seperti Cloudinary.

## 4. Alur Kerja Aplikasi
- **Pengunjung** membuka web utama -> Disambut desain elegan -> Melihat daftar produk -> Mengklik tombol menuju URL web produk.
- **Admin (Anda)** login ke halaman tersembunyi `/admin` -> Melakukan CRUD (Create, Read, Update, Delete) pada tabel produk di database Aiven via API Node.js.
