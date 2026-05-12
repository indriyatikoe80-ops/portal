# Skema Database (MySQL di Aiven)

Database akan dirancang sesederhana mungkin namun dapat dikembangkan, difokuskan pada manajemen konten portal.

## Tabel 1: `users` (Untuk akses CMS)
Tabel untuk menyimpan akun administrator yang bisa mengelola portal.

```sql
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY, -- UUID
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Tabel 2: `categories` (Opsional untuk pengelompokan produk)
```sql
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);
```

## Tabel 3: `products` (Konten Utama)
Tabel ini menyimpan rincian web produk yang akan ditampilkan di portal.

```sql
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY, -- UUID
    title VARCHAR(150) NOT NULL,
    description TEXT,
    url VARCHAR(255) NOT NULL, -- Link ke web produk
    image_url VARCHAR(255),    -- Thumbnail web produk
    category_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0, -- Urutan tampil di website
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
```

## Tabel 4: `site_settings`
Menyimpan konfigurasi umum web seperti Judul Web, Deskripsi, Link Sosmed.

```sql
CREATE TABLE site_settings (
    setting_key VARCHAR(50) PRIMARY KEY,
    setting_value TEXT NOT NULL
);

-- Contoh Data:
-- ('site_title', 'Portofolio Candra - Web Edukasi & Utilitas')
-- ('contact_email', 'admin@example.com')
```
