import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import prisma from '../utils/prisma';

export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { items, totalAmount } = req.body;
    const cashierId = req.user?.id;

    if (!cashierId) {
      return res.status(401).json({ message: 'Unauthorized: No cashier identified' });
    }

    // Use Prisma Transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create the transaction header
      const transaction = await tx.transaction.create({
        data: {
          totalAmount,
          cashierId: cashierId,
        }
      });

      // 2. Create transaction items AND decrement stock
      for (const item of items) {
        // Create the item record
        await tx.transactionItem.create({
          data: {
            transactionId: transaction.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice
          }
        });

        // Decrement the product stock
        const product = await tx.product.findUnique({ where: { id: item.productId } });
        if (!product || product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product: ${product?.name || item.productId}`);
        }

        await tx.product.update({
          where: { id: item.productId },
          data: { stock: product.stock - item.quantity }
        });
      }

      return transaction;
    });

    res.status(201).json({
      message: 'Transaction completed successfully',
      transactionId: result.id
    });
  } catch (error: any) {
    console.error('Transaction error:', error);
    res.status(400).json({ message: error.message || 'Error processing transaction' });
  }
};

export const getTransactions = async (req: any, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user.id;
    const userRole = req.user.role;

    const where: any = {};
    
    // Role-based filtering: CS only sees their own transactions
    if (userRole === 'CS') {
      where.cashierId = userId;
    }

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string)
      };
    }

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        cashier: { select: { username: true } },
        items: { include: { product: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};
