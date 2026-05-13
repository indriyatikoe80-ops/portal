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

## Data Awal
Gunakan `docs/init_database.sql` untuk membuat tabel dan mengisi data awal ke dalam Aiven MySQL. Contoh data seed ini memberikan akun admin, kategori, produk, dan konfigurasi situs.

Contoh akun awal:
- admin / Admin123!
- editor / Editor123!

Contoh isi `docs/init_database.sql`:
```sql
INSERT IGNORE INTO users (id, username, password_hash, created_at) VALUES
('00000000-0000-0000-0000-000000000001', 'admin', '<bcrypt_hash_admin>', NOW());

INSERT IGNORE INTO categories (name, slug) VALUES
('Edukasi Anak', 'edukasi-anak'),
('Utilitas Warga', 'utilitas-warga');

INSERT IGNORE INTO products (id, title, description, url, image_url, category_id, is_active, display_order, created_at, updated_at) VALUES
('10000000-0000-0000-0000-000000000001', 'Belajar Coding Interaktif', 'Platform learning yang membantu anak-anak belajar coding dengan permainan interaktif.', 'https://contoh.com/coding-anak', 'https://images.contoh.com/coding-anak.jpg', 1, TRUE, 1, NOW(), NOW());
```
