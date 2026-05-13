# Admin Guide - Portal Inovasi Digital

## Getting Started

### Login

1. Buka halaman admin: `http://localhost:5173/login`
2. Masukkan credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
3. Klik **Login**

> **Note**: Untuk production, pastikan menggunakan credentials yang aman dari database users table.

---

## Manajemen Produk

### Menambahkan Produk Baru

1. Setelah login, Anda akan melihat Dashboard Admin
2. Klik tombol **"+ Tambah Produk Baru"**
3. Isi form:
   - **Judul** (wajib): Nama produk
   - **Deskripsi** (wajib): Deskripsi lengkap produk
   - **URL** (wajib): Link ke produk (https://...)
   - **Image URL** (opsional): Link gambar thumbnail
   - **Aktif**: Checklist jika produk aktif
   - **Urutan**: Angka untuk pengurutan (0-999)
4. Klik **Save** untuk menyimpan

### Mengedit Produk

1. Di tabel daftar produk, klik tombol **Edit** pada produk yang ingin diubah
2. Form akan terisi dengan data produk saat ini
3. Ubah data yang diperlukan
4. Klik **Update** untuk menyimpan perubahan

### Menghapus Produk

1. Di tabel daftar produk, klik tombol **Delete** pada produk yang ingin dihapus
2. Konfirmasi dialog akan muncul
3. Klik **OK** untuk menyetujui penghapusan

> **Warning**: Tindakan penghapusan tidak dapat dibatalkan.

---

## Fitur Dashboard

### Protected Routes
- Halaman admin (`/admin`) dilindungi oleh autentikasi
- Jika token tidak valid atau expired, Anda akan dialihkan ke halaman login

### Responsive Design
- DashboardAdmin responsive di semua ukuran layar
- Tabel produk memiliki scroll horizontal di mobile

---

## API Endpoints Reference

### Public Endpoints
- `GET /api/v1/products` - Ambil semua produk aktif
- `GET /api/v1/settings` - Ambil semua pengaturan situs

### Admin Endpoints (Authenticated)
- `GET /api/v1/products/all` - Ambil semua produk (termasuk tidak aktif)
- `POST /api/v1/products` - Buat produk baru
- `PUT /api/v1/products/:id` - Update produk
- `DELETE /api/v1/products/:id` - Hapus produk
- `PUT /api/v1/settings` - Update pengaturan

### AI Endpoints
- `POST /api/v1/ai/generate-description` - Generate deskripsi produk dengan AI
- `POST /api/v1/ai/classify-category` - Klasifikasi kategori produk
- `POST /api/v1/ai/summarize` - Ringkas teks

---

## Troubleshooting

### Login Gagal
- Pastikan username dan password benar
- Cek backend server berjalan (http://localhost:5000)
- Hapus token lama dari localStorage jika perlu

### Produk Tidak muncul di Homepage
- Pastikan produk memiliki status **Aktif**
- Refresh halaman setelah membuat produk baru
- Cek API response di browser DevTools > Network

### API Errors
- 401: Token tidak valid atau tidak ada - Login ulang
- 403: Tidak punya akses - Pastikan endpoint membutuhkan autentikasi
- 500: Server error - Check backend logs

---

## Security Recommendations

1. **Ubah Password Default**: Ganti credentials default di production
2. **HTTPS**: Pastikan semua traffic melalui HTTPS
3. **JWT Secret**: Gunakan random string yang kuat di production
4. **Database**: Gunakan strong password dan limit user privileges
5. **CORS**: Update `CORS_ORIGIN` hanya untuk domain frontend yang valid

---

## Supported Browsers

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

**Last Updated**: May 13, 2026  
**Version**: 1.0.0
