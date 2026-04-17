import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1. Clean up existing users
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();

  // 2. Create Users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const csPassword = await bcrypt.hash('cs123', 10);

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const cs = await prisma.user.create({
    data: {
      username: 'cs',
      password: csPassword,
      role: 'CS',
    },
  });

  // 3. Initialize Settings
  await prisma.setting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      shopName: 'Toko Bangunan (TB)',
      shopAddress: 'Jl. Raya Industri No. 1, Jakarta',
      shopPhone: '0812-3456-7890',
      lowStockThreshold: 10
    }
  });

  // 4. Create Sample Products
  await prisma.product.createMany({
    data: [
      { sku: 'SEM-TR-001', name: 'Semen Tiga Roda', category: 'Semen', price: 65000, costPrice: 58000, stock: 100, unit: 'Sak', icon: '🧱' },
      { sku: 'BESI-10-001', name: 'Besi Beton 10mm', category: 'Besi', price: 88000, costPrice: 75000, stock: 50, unit: 'Batang', icon: '🏗️' },
      { sku: 'CAT-DX-001', name: 'Cat Dulux Putih 5kg', category: 'Cat', price: 210000, costPrice: 165000, stock: 20, unit: 'Pail', icon: '🎨' },
    ],
  });

  console.log('✅ Seeding completed!');
  console.log('Admin account: admin / admin123');
  console.log('CS account: cs / cs123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
