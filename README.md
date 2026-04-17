# 🏗️ TB (Toko Bangunan) - Backend Engine

Backend resmi untuk aplikasi **TB (Toko Bangunan)**. Repositori ini bertanggung jawab atas pemrosesan data, manajemen stok, dan logika bisnis inti menggunakan arsitektur yang aman dan terstruktur.

---

## 🚀 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js (v5+)
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: SQLite (Development) / Production Ready
- **Security**: JWT (Json Web Token), Bcrypt (Password Hashing), CORS (Session-aware)

---

## 🛠️ Main Features (Completed)
- **🔐 Multi-Role Authentication**: Sistem login aman untuk Admin dan CS dengan proteksi JWT.
- **📦 Inventory Mastery**: API lengkap untuk manajemen produk (CRUD), kategori, dan kontrol stok.
- **💰 POS Transaction Engine**: Logika transaksi yang mendukung pengurangan stok otomatis dan pencatatan riwayat.
- **📊 Advanced Analytics**: Perhitungan laba kotor, statistik harian, dan tren penjualan 7 hari terakhir.
- **⚙️ Global Configuration**: Pengaturan identitas toko (Alamat, Telp) dan aturan ambang batas stok rendah (*low stock threshold*).

---

## 📁 Directory Structure
```text
src/
├── controllers/    # Request handling & Logic (Auth, Analytics, Products, etc.)
├── routes/         # API Endpoint definitions
├── middlewares/    # Auth protection, Role validation, & Global error handling
├── utils/          # Prisma client and shared helper functions
└── prisma/         # Database schema and seed scripts
```

---

## 📡 Getting Started

1. **Installation**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Buat file `.env` di root folder dan tambahkan:
   ```env
   PORT=5000
   DATABASE_URL="file:./dev.db"
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Database & Prisma**:
   Jalankan perintah berikut untuk mensinkronkan database:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   npx prisma db seed
   ```

4. **Execution**:
   ```bash
   npm run dev
   ```

---
> *Maintaining TB (Toko Bangunan) with High-Rigor Architecture. v1.0.0*
