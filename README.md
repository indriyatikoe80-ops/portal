# Portal Inovasi Digital

Web portal untuk manajemen ekosistem produk digital dengan admin dashboard dan integrasi AI/Hugging Face.

![Status](https://img.shields.io/badge/status-Development-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### Public Website
- Responsive landing page dengan desain dark mode + neon
- Katalog produk dari database
- Navigasi smooth & animations
- Optimized untuk SEO

### Admin Dashboard
- Login system dengan JWT
- CRUD produk (Create, Read, Update, Delete)
- Protected routes
- Real-time update ke public page

### AI Integration
- Generate deskripsi produk otomatis (Hugging Face GPT-2)
- Klasifikasi kategori produk otomatis
- Ringkasan teks

---

## 🏗️ Architecture

```
portal/
├── backend/           # Express.js API server
│   ├── config/        # Database & HF config
│   ├── middleware/    # Auth middleware
│   ├── routes/        # API endpoints
│   ├── index.js       # Entry point
│   └── package.json
├── frontend/          # React + Vite SPA
│   ├── src/
│   │   ├── components/# Reusable UI
│   │   ├── pages/     # Page components
│   │   └── App.css    # Global styles
│   └── package.json
└── docs/              # Documentation
```

**Tech Stack:**
- **Frontend**: React 19, React Router DOM 7, Vite
- **Backend**: Express.js, Node.js, MySQL2
- **Database**: MySQL (Aiven Cloud)
- **AI**: Hugging Face Inference API
- **Auth**: JWT + bcrypt
- **Styling**: Custom CSS with CSS Variables

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MySQL database (local atau Aiven)
- Hugging Face API token (optional untuk AI features)

### Installation

#### 1. Clone Repository
```bash
git clone <repo-url>
cd portal
```

#### 2. Backend Setup
```bash
cd backend
npm install

# Copy environment file
cp .env.example .env

# Edit .env dengan credentials Anda:
# DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT
# JWT_SECRET (generate random string)
# HUGGINGFACE_API_TOKEN (optional)
# CORS_ORIGIN=http://localhost:5173

npm run dev
# Server berjalan di http://localhost:5000
```

#### 3. Frontend Setup
```bash
cd frontend
npm install

# Environment sudah diset di .env.local
npm run dev
# App berjalan di http://localhost:5173
```

#### 4. Database Setup
```bash
# Import schema dari docs/init_database.sql
mysql -h <DB_HOST> -u <DB_USER> -p <DB_NAME> < docs/init_database.sql
```

---

## 📁 Project Structure

### Backend Routes

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/auth/login` | POST | Public | Admin login |
| `/api/v1/products` | GET | Public | Get all active products |
| `/api/v1/products` | POST | Admin | Create product |
| `/api/v1/products/:id` | PUT | Admin | Update product |
| `/api/v1/products/:id` | DELETE | Admin | Delete product |
| `/api/v1/products/all` | GET | Admin | Get all products |
| `/api/v1/settings` | GET | Public | Get site settings |
| `/api/v1/ai/generate-description` | POST | Admin | AI generate description |
| `/api/v1/ai/classify-category` | POST | Admin | AI classify category |
| `/api/v1/ai/summarize` | POST | Admin | AI summarize text |

### Frontend Routes (React Router)
- `/` - Home page (public)
- `/login` - Admin login
- `/admin` - Admin dashboard (protected)

---

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
PORT=5000
DB_HOST=your-db-host.aivencloud.com
DB_PORT=12345
DB_USER=avnadmin
DB_PASSWORD=your-password
DB_NAME=portal_db
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRY=7d
HUGGINGFACE_API_TOKEN=hf_xxx (optional)
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

**Frontend (.env.local):**
```env
VITE_API_URL=http://localhost:5000/api/v1
```

### Database Schema

Lihat `docs/02-database.md` untuk detail skema database.

Sample data sudah di-prepare di `docs/init_database.sql`.

---

## 🧪 Testing

### API Testing dengan curl
```bash
# Health check
curl http://localhost:5000/health

# Get products
curl http://localhost:5000/api/v1/products

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# AI endpoint (requires token)
curl -X POST http://localhost:5000/api/v1/ai/generate-description \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Product","keywords":"tech,innovation"}'
```

### Frontend Testing
1. Buka http://localhost:5173
2. Cek produk muncul di homepage
3. Test login di /login
4. Test CRUD di /admin

---

## 🚢 Deployment

### Backend (Render)
1. Push code ke GitHub
2. Di Render.com, create New Web Service
3. Connect GitHub repo, root directory: `backend/`
4. Build: `npm install`, Start: `npm start`
5. Set environment variables dari production .env
6. Deploy

### Frontend (Vercel/Netlify)
1. Deploy frontend folder
2. Set `VITE_API_URL` ke backend URL production
3. Build settings: npm run build, output: `dist`

Detail lengkap di `docs/05-implementation-plan.md` (Fase 6).

---

## 📊 Progress Tracking

Status pengembangan berdasarkan `progress/01_master_plan.md`:

- ✅ **FASE 1**: Infrastructure Setup (SELESAI)
- 🚧 **FASE 2**: Backend & Database (IN PROGRESS)
- 🚧 **FASE 3**: Frontend Public (IN PROGRESS)
- 🚧 **FASE 4**: Admin Dashboard (IN_PROGRESS)
- ⏳ **FASE 5**: Integration Testing & Polishing
- ⏳ **FASE 6**: Deployment

Last updated: May 13, 2026

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [docs/01-concept.md](docs/01-concept.md) | Konsep & fitur utama |
| [docs/02-database.md](docs/02-database.md) | Skema database MySQL |
| [docs/03-ui-ux.md](docs/03-ui-ux.md) | Desain UI/UX |
| [docs/04-api-spec.md](docs/04-api-spec.md) | Spesifikasi API |
| [docs/05-implementation-plan.md](docs/05-implementation-plan.md) | Rencana implementasi |
| [docs/06-huggingface-integration.md](docs/06-huggingface-integration.md) | Integrasi AI |
| [ADMIN_GUIDE.md](ADMIN_GUIDE.md) | Panduan admin |

---

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## ⚠️ Security

**Jangan commit file berikut ke repository:**
- `.env` (berisi credentials)
- `node_modules/`
- `dist/` (built frontend)

**Security Checklist untuk Production:**
- [ ] Ganti JWT_SECRET dengan random string yang kuat
- [ ] Set CORS_ORIGIN hanya untuk domain frontend
- [ ] Enable HTTPS (otomatis di Render/Vercel)
- [ ] Gunakan strong password untuk database
- [ ] Hapus fallback login dev dari `backend/routes/auth.js`
- [ ] Setup rate limiting (sudah diimplementasikan)
- [ ] Enable database SSL (Aiven default)

---

## 📝 License

MIT License - lihat file LICENSE untuk detail.

---

## 💡 Questions?

- Check [docs/](docs/) folder untuk technical specs
- Buka issue di GitHub repository
- Kontak developer team

---

**Built with ❤️ using Node.js, React, and Hugging Face**
