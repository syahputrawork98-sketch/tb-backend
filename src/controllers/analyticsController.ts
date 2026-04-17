import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// 1. ADMIN: Global Summary (Revenue, Profit, Items)
export const getSummary = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: { items: true } // We now have costPrice in items directly
    });

    let totalRevenue = 0;
    let totalProfit = 0;

    transactions.forEach(t => {
      totalRevenue += t.totalAmount;
      t.items.forEach(item => {
        const itemCost = item.costPrice || 0; // Use the snapshot!
        totalProfit += (item.unitPrice - itemCost) * item.quantity;
      });
    });

    // Unify threshold from Settings
    const settings = await prisma.setting.findUnique({ where: { id: 1 } });
    const threshold = settings?.lowStockThreshold || 10;

    const totalProducts = await prisma.product.count();
    const lowStockItems = await prisma.product.count({
      where: { stock: { lt: threshold } }
    });

    res.json({
      totalRevenue,
      totalProfit,
      totalTransactions: transactions.length,
      totalProducts,
      lowStockItems
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching summary' });
  }
};

// 2. ADMIN: Sales Chart (Last 7 Days)
export const getSalesChart = async (req: Request, res: Response) => {
  try {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      last7Days.push(d);
    }

    const chartData = await Promise.all(last7Days.map(async (date) => {
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      const daySales = await prisma.transaction.aggregate({
        where: {
          createdAt: { gte: date, lt: nextDate }
        },
        _sum: { totalAmount: true }
      });

      return {
        date: date.toLocaleDateString('id-ID', { weekday: 'short' }),
        amount: daySales._sum.totalAmount || 0
      };
    }));

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chart data' });
  }
};

// 3. CS: Dashboard Stats (Current Shift/Today)
export const getCSDashboardStats = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const salesData = await prisma.transaction.aggregate({
      where: {
        cashierId: userId,
        createdAt: { gte: today }
      },
      _sum: { totalAmount: true },
      _count: { id: true }
    });

    const settings = await prisma.setting.findUnique({ where: { id: 1 } });
    const threshold = settings?.lowStockThreshold || 10;
    
    const lowStockCount = await prisma.product.count({
      where: { stock: { lt: threshold } }
    });

    res.json({
      todaySales: salesData._sum.totalAmount || 0,
      todayTransactions: salesData._count.id || 0,
      lowStockItems: lowStockCount,
      totalProducts: await prisma.product.count()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching CS stats' });
  }
};