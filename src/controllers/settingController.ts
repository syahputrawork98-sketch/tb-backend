import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Get Global Settings
export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = await prisma.setting.findUnique({
      where: { id: 1 }
    });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings' });
  }
};

// Update Global Settings (Admin Only)
export const updateSettings = async (req: Request, res: Response) => {
  try {
    const { shopName, shopAddress, shopPhone, lowStockThreshold } = req.body;

    const settings = await prisma.setting.update({
      where: { id: 1 },
      data: {
        shopName,
        shopAddress,
        shopPhone,
        lowStockThreshold: Number(lowStockThreshold)
      }
    });

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings' });
  }
};
