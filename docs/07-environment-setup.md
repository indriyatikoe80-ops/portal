# Setup Environment & Configuration

Dokumen ini menjelaskan cara mengatur environment variables dan konfigurasi untuk menjalankan backend dan frontend secara lokal maupun production.

## 1. Backend Environment Setup

### 1.1 File `.env` di Root Backend (`backend/.env`)

Buat file `.env` di folder `backend/` dengan isi berikut:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database (MySQL Aiven)
DB_HOST=your-aiven-mysql-host.aivencloud.com
DB_PORT=12345
DB_USER=avnadmin
DB_PASSWORD=your_mysql_password
DB_NAME=portal_db
DB_SSL=true

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_keep_it_safe_123456789
JWT_EXPIRY=7d

# Hugging Face AI Integration
HUGGINGFACE_API_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxxx

# CORS Configuration (untuk development)
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# Logging
LOG_LEVEL=debug
```

### 1.2 Penjelasan Environment Variables

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `PORT` | Port server backend | `5000` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `DB_HOST` | Host database MySQL Aiven | `db-instance.aivencloud.com` |
| `DB_PORT` | Port database | `12345` |
| `DB_USER` | Username database | `avnadmin` |
| `DB_PASSWORD` | Password database (JANGAN SHARE) | `password_aman_123` |
| `DB_NAME` | Nama database | `portal_db` |
| `DB_SSL` | Gunakan SSL untuk koneksi (Aiven memerlukan ini) | `true` |
| `JWT_SECRET` | Secret key untuk sign JWT token (JANGAN SHARE) | Minimal 32 karakter |
| `JWT_EXPIRY` | Durasi token valid | `7d` atau `24h` |
| `HUGGINGFACE_API_TOKEN` | Token API Hugging Face | `hf_xxxxx...` |
| `CORS_ORIGIN` | Domain yang diizinkan akses API | `http://localhost:5173` |

### 1.3 Cara Mendapatkan Credentials

#### Database Aiven MySQL
1. Login ke [Aiven Console](https://console.aiven.io/)
2. Pilih MySQL service Anda
3. Tab "Connection" -> Copy:
   - Host: `DB_HOST`
   - Port: `DB_PORT` (default 12345)
   - Username: `DB_USER`
   - Password: `DB_PASSWORD`

#### Hugging Face API Token
1. Login ke [Hugging Face](https://huggingface.co/)
2. Pergi ke Settings > Access Tokens
3. Klik "New token" -> Beri nama (misal: "Portal Backend")
4. Pilih "Inference" read access
5. Copy token ke `HUGGINGFACE_API_TOKEN`

#### JWT Secret
Generate random string 32+ karakter:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 1.4 File `.gitignore` Backend

**Pastikan `.env` TIDAK di-commit ke Git!**

```gitignore
# Environment
.env
.env.local
.env.*.local

# Node modules
node_modules/

# Logs
logs/
*.log
npm-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# Build output
dist/
build/

# OS
.DS_Store
Thumbs.db
```

## 1.5 Backend Online Deployment Notes
- Backend akan dijalankan online di **Hugging Face Spaces**, sehingga environment variables harus dikelola di settings Space Hugging Face.
- Aiven MySQL memerlukan koneksi SSL. Pastikan `DB_SSL=true` pada file `.env` dan di konfigurasi koneksi MySQL.
- Gunakan `HUGGINGFACE_API_TOKEN` yang valid untuk memanggil Hugging Face Inference API secara online.
- Saat deploy di Hugging Face Spaces, set environment variables di Space settings dan jangan commit `.env` ke Git.

## 2. Frontend Environment Setup

### 2.1 File `.env.local` di Frontend (`frontend/.env.local`)

Buat file `.env.local` untuk development:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api/v1

# App Configuration
VITE_APP_NAME=Portal Inovasi Digital
VITE_APP_DESCRIPTION=Pusat ekosistem produk web inovatif

# Feature Flags
VITE_ENABLE_AI_FEATURES=true
```

### 2.2 Production `.env` (`frontend/.env.production`)

Untuk deployment ke production:

```env
# API Configuration (update dengan URL production Hugging Face Spaces)
VITE_API_URL=https://candrabuwana80-my-backend-api.hf.space/api/v1

# App Configuration
VITE_APP_NAME=Portal Inovasi Digital
VITE_APP_DESCRIPTION=Pusat ekosistem produk web inovatif

# Feature Flags
VITE_ENABLE_AI_FEATURES=true
```

### 2.3 Akses Environment Variables di React

Dalam file React, gunakan `import.meta.env`:

```javascript
// src/config.js
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
export const APP_NAME = import.meta.env.VITE_APP_NAME;
export const ENABLE_AI = import.meta.env.VITE_ENABLE_AI_FEATURES === 'true';
```

Kemudian gunakan di komponen:

```javascript
import { API_URL } from './config';

const response = await fetch(`${API_URL}/products`);
```

## 3. Struktur `.env` untuk Different Environments

### Development (Local)
```
NODE_ENV=development
DB_HOST=localhost / Aiven host
HUGGINGFACE_API_TOKEN=valid token
JWT_SECRET=simple secret untuk testing
```

### Staging (Pre-production)
```
NODE_ENV=staging
DB_HOST=Aiven host (same production)
HUGGINGFACE_API_TOKEN=valid token
JWT_SECRET=strong secret
LOG_LEVEL=info
```

### Production (Hugging Face Spaces & Aiven)
```
NODE_ENV=production
DB_HOST=Aiven host
HUGGINGFACE_API_TOKEN=valid token
JWT_SECRET=very strong secret
LOG_LEVEL=warn
DB_SSL=true
CORS_ORIGIN=https://yourdomain.com
```

## 4. Setup di Hugging Face Spaces (Deployment)

Saat deploy di Hugging Face Spaces, **jangan** push `.env` ke Git. Sebaliknya, set variables di Space settings:

1. Buka Space Anda di [Hugging Face Spaces](https://huggingface.co/spaces)
2. Pilih Space backend portal Anda
3. Pergi ke "Environment" tab
4. Tambahkan setiap variable dari `.env`:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `JWT_SECRET`
   - `HUGGINGFACE_API_TOKEN`
   - `NODE_ENV=production`
5. Klik "Deploy"

## 5. Best Practices

### ✅ DO
- ✅ Gunakan `.env` untuk development lokal
- ✅ Simpan `.env` di `.gitignore`
- ✅ Gunakan environment variables di Hugging Face Spaces settings
- ✅ Rotate JWT_SECRET & password secara berkala
- ✅ Gunakan HTTPS di production
- ✅ Limit CORS_ORIGIN ke domain resmi Anda

### ❌ DON'T
- ❌ Jangan commit `.env` ke Git
- ❌ Jangan hardcode credentials di kode
- ❌ Jangan share JWT_SECRET atau password di chat
- ❌ Jangan gunakan password yang sama untuk dev & production
- ❌ Jangan buka CORS ke `*` di production (hanya izinkan domain tertentu)

## 6. Troubleshooting

### Error: "Cannot find module 'dotenv'"
```bash
npm install dotenv
```

### Error: "HUGGINGFACE_API_TOKEN is undefined"
- Pastikan `.env` ada dan berisi `HUGGINGFACE_API_TOKEN`
- Restart server: `npm run dev`
- Cek: `console.log(process.env.HUGGINGFACE_API_TOKEN)` di `index.js`

### Database Connection Refused
- Verify `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` di `.env`
- Test koneksi manual: `mysql -h $DB_HOST -u $DB_USER -p` (input password)
- Pastikan firewall/IP whitelist Aiven allow koneksi dari IP Anda

### CORS Error dari Frontend
- Tambahkan `http://localhost:5173` ke `CORS_ORIGIN` di backend `.env`
- Di production, ganti dengan domain frontend Anda
- Restart backend setelah ubah `.env`

---

**Referensi**: Baca juga `04-api-spec.md` dan `06-huggingface-integration.md` untuk konfigurasi lebih detail.
