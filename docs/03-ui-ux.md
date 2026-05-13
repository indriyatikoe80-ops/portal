# Desain Antarmuka (UI) dan Pengalaman Pengguna (UX)

Untuk memenuhi persyaratan "sangat bagus, profesional, keren, dan premium", konsep desain akan menggunakan gaya **Modern Glassmorphism** dengan palet warna **Dark Mode**.

## 1. Tema Visual
- **Gaya**: Dark theme dengan aksen neon (Glow effects). Memberikan kesan teknologi canggih dan eksklusif.
- **Efek**: Elemen kartu transparan (glassmorphism) berlatar buram (backdrop-filter blur), bayangan halus, dan mikro-animasi (elemen bergerak pelan atau membesar saat kursor diarahkan).
- **Tipografi**: Menggunakan font Google modern (misalnya `Inter` untuk teks bacaan dan `Outfit` atau `Space Grotesk` untuk judul).

## 2. Palet Warna (Contoh)
- **Background Utama**: Radial gradient gelap (`#0B0E14` ke `#151A23`)
- **Card Background**: Semi-transparan (`rgba(255, 255, 255, 0.05)`)
- **Aksen Primer (Glow)**: Cyan / Electric Blue (`#00F0FF`)
- **Aksen Sekunder**: Violet (`#8A2BE2`)
- **Teks Utama**: Putih (`#FFFFFF`)
- **Teks Sekunder**: Abu-abu terang (`#A0AEC0`)

## 3. Struktur Halaman (Satu Halaman Utama / Single Page)

### A. Header / Navigasi
- Logo portal di kiri.
- Link navigasi di kanan (Home, Produk, Tentang, Kontak).
- Efek *sticky* saat di-scroll (background header menjadi sedikit buram).

### B. Hero Section (Atas)
- Judul besar dan berani: *"Satu Portal, Beragam Solusi Digital"*
- Sub-judul: *"Jelajahi inovasi kami mulai dari aplikasi edukasi anak hingga utilitas cerdas."*
- Tombol Call-to-Action (CTA): *"Lihat Produk"* dengan efek hover *glowing*.
- Latar belakang berupa animasi partikel halus atau gradien warna bergerak lambat.

### C. Seksi Profil, Visi, dan Misi (Tentang Kami)
- Ditempatkan setelah Hero Section atau sebelum Showcase Produk.
- Desain *split-screen* atau *bento-grid* modern: sebagian menampilkan teks profil, sebagian lagi menyorot Visi & Misi dengan ikon neon elegan.
- Transisi *fade-in-up* saat di-scroll untuk memberikan kesan elegan dan profesional.

### D. Showcase Produk (Tengah-Bawah)
- Ditampilkan dalam format Grid (1 kolom di HP, 2 kolom di Tablet, 3 kolom di Desktop).
- Setiap produk diwakili sebuah "Kartu" (Card).
- **Elemen Kartu**:
  - Gambar/Thumbnail representasi web (di bagian atas kartu).
  - Judul Produk (misal: "Taman Bermain & Belajar").
  - Deskripsi singkat.
  - Tombol "Kunjungi Website" -> akan membuka tab baru menuju web produk.
- **Interaksi**: Saat kartu di-hover, kartu akan sedikit terangkat (translateY) dan batas (border) kartu bersinar (glow).

### E. Footer (Bawah)
- Informasi hak cipta, tautan media sosial, kontak, dan tautan login tersembunyi untuk admin.

## 4. Aspek Responsif
- **Mobile**: Teks disesuaikan ukurannya, padding lebih kecil, grid menjadi tumpukan vertikal. Navigasi berubah menjadi Hamburger Menu.
- **Desktop**: Pemanfaatan ruang kosong (whitespace) agar terlihat rapi dan tidak padat.
