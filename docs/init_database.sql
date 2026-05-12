-- Script untuk inisialisasi Database Portal
-- Bisa di-import langsung ke MySQL (Aiven) atau client seperti phpMyAdmin/DBeaver

-- 1. Membuat tabel pengguna admin
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY, -- Direncanakan menggunakan UUID
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
    id VARCHAR(36) PRIMARY KEY, -- Direncanakan menggunakan UUID
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
INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES 
('site_title', 'Portal Inovasi Digital'),
('site_description', 'Pusat ekosistem produk web inovatif'),
('profile_text', 'Kami mendedikasikan diri untuk membangun solusi digital inovatif yang bermanfaat bagi masyarakat, mulai dari pendidikan hingga tata kelola lingkungan.'),
('visi_text', 'Menjadi pusat ekosistem digital terdepan yang menghasilkan produk inklusif, edukatif, solutif, dan berstandar profesional.'),
('misi_text', '1. Mengembangkan aplikasi yang tepat guna dan mudah diakses.\n2. Memberikan pengalaman pengguna (UX) yang premium dan estetik.\n3. Terus berinovasi memecahkan masalah sehari-hari.');

INSERT IGNORE INTO categories (name, slug) VALUES 
('Edukasi Anak', 'edukasi-anak'),
('Utilitas Warga', 'utilitas-warga');
