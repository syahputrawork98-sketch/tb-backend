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

  // 3. Create Sample Products
  await prisma.product.createMany({
    data: [
      { sku: 'SEM-TR-001', name: 'Semen Tiga Roda', category: 'Semen', price: 65000, stock: 100, unit: 'Sak', icon: '🧱' },
      { sku: 'BESI-10-001', name: 'Besi Beton 10mm', category: 'Besi', price: 88000, stock: 50, unit: 'Batang', icon: '🏗️' },
      { sku: 'CAT-DX-001', name: 'Cat Dulux Putih 5kg', category: 'Cat', price: 210000, stock: 20, unit: 'Pail', icon: '🎨' },
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
