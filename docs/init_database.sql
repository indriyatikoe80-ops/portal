-- Script untuk inisialisasi Database Portal
-- Bisa di-import langsung ke MySQL (Aiven) atau client seperti phpMyAdmin/DBeaver

-- 1. Membuat tabel pengguna admin
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Membuat tabel kategori produk (Opsional, untuk filter)
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);

-- 3. Membuat tabel produk / link web
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    url VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    category_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 4. Membuat tabel pengaturan web dasar (termasuk Visi, Misi, Profile)
CREATE TABLE IF NOT EXISTS site_settings (
    setting_key VARCHAR(50) PRIMARY KEY,
    setting_value TEXT NOT NULL
);

-- 5. Insert Data Awal (Dummy)
INSERT IGNORE INTO users (id, username, password_hash, created_at) VALUES
('00000000-0000-0000-0000-000000000001', 'admin', '$2b$10$gQuCeg2o2FtZWIo5lwb/UO5ajEDhN7bE4J0Zff7XF7WJ4BPzlfTru', NOW());
-- Password (plain text untuk login): Admin123!

INSERT IGNORE INTO users (id, username, password_hash, created_at) VALUES
('00000000-0000-0000-0000-000000000002', 'editor', '$2b$10$aJUmTG3FGdyuH3.IsvSFNOBBc1GpEwJuNPAC84niQdRTSHxRv0J36', NOW());
-- Password (plain text untuk login): Editor123!

INSERT IGNORE INTO categories (name, slug) VALUES
('Edukasi Anak', 'edukasi-anak'),
('Utilitas Warga', 'utilitas-warga'),
('Produktivitas', 'produktivitas'),
('Keamanan Digital', 'keamanan-digital');

INSERT IGNORE INTO products (id, title, description, url, image_url, category_id, is_active, display_order, created_at, updated_at) VALUES
('10000000-0000-0000-0000-000000000001', 'Belajar Coding Interaktif', 'Platform learning yang membantu anak-anak belajar coding dengan permainan interaktif.', 'https://contoh.com/coding-anak', 'https://images.contoh.com/coding-anak.jpg', 1, TRUE, 1, NOW(), NOW()),
('10000000-0000-0000-0000-000000000002', 'Kalender Sampah Pintar', 'Aplikasi pengingat jadwal pembuangan sampah untuk warga dengan notifikasi lokal.', 'https://contoh.com/kalender-sampah', 'https://images.contoh.com/kalender-sampah.jpg', 2, TRUE, 2, NOW(), NOW()),
('10000000-0000-0000-0000-000000000003', 'Manajemen Tugas Keluarga', 'Web app untuk membuat daftar tugas keluarga, menyusun jadwal, dan berbagi tugas anggota.', 'https://contoh.com/tugas-keluarga', 'https://images.contoh.com/tugas-keluarga.jpg', 3, TRUE, 3, NOW(), NOW()),
('10000000-0000-0000-0000-000000000004', 'Panduan Keamanan Online', 'Situs edukasi keamanan digital untuk orang tua dan anak-anak yang belajar aman di internet.', 'https://contoh.com/keamanan-online', 'https://images.contoh.com/keamanan-online.jpg', 4, TRUE, 4, NOW(), NOW());

INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES
('site_title', 'Portal Inovasi Digital'),
('site_description', 'Pusat ekosistem produk web inovatif untuk edukasi, utilitas warga, dan keamanan digital.'),
('contact_email', 'support@portal-inovasi.com'),
('contact_phone', '+62-812-3456-7890'),
('profile_text', 'Portal ini menghadirkan produk web berkualitas dengan fokus pada pengalaman pengguna, integrasi AI, dan kemudahan akses.'),
('visi_text', 'Menjadi pusat portal digital terpercaya yang mendorong inovasi dan solusi sehari-hari.'),
('misi_text', '1. Menyediakan produk web yang ramah pengguna.\n2. Memanfaatkan AI Hugging Face secara efektif.\n3. Menghubungkan warga, pelajar, dan pelaku usaha melalui solusi digital.'),
('footer_text', 'Hak Cipta © 2026 Portal Inovasi Digital. Dihosting dengan Aiven MySQL & Hugging Face API.');
