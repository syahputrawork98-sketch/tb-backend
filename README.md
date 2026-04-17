# 🏗️ TB (Toko Bangunan) - Backend Engine

Backend resmi untuk aplikasi **TB (Toko Bangunan)**. Repositori ini bertanggung jawab atas pemrosesan data, manajemen stok, dan logika bisnis inti.

---

## 🚀 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL / MySQL (via Prisma)
- **Security**: JWT, Helmet, Cors

---

## 📁 Directory Structure
```text
src/
├── controllers/    # Request handling & Response management
├── services/       # Core Business Logic
├── models/         # Database Schemas (Prisma)
├── middleware/     # Security & Validation
├── routes/         # API Endpoint Definitions
└── utils/          # Helper functions
```

---

## 🛠️ Main Features (Roadmap)
- [ ] **Auth System**: Login & Register (Admin & CS).
- [ ] **Inventory Hub**: CRUD Material Bangunan & Update Stok.
- [ ] **Order Processing**: Validasi pesanan & Kalkulasi biaya.
- [ ] **Reporting**: Laporan harian/bulanan penjualan.

---

## 📡 Getting Started
1. **Installation**:
   ```bash
   npm install
   ```
2. **Environment**: Salin `.env.example` ke `.env` (jika ada) dan isi variabel yang dibutuhkan.
3. **Execution**:
   ```bash
   npm run dev
   ```

---
> *Maintaining TB (Toko Bangunan) with High-Rigor Architecture.*
