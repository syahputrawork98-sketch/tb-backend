import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Create new product (Admin Only)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { sku, name, category, price, stock, unit, icon } = req.body;
    
    const product = await prisma.product.create({
      data: { sku, name, category, price, stock, unit, icon }
    });
    
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Update stock (Admin / CS)
export const updateStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { stock }
    });
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating stock' });
  }
};
