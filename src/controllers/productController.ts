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
    const { sku, name, category, price, costPrice, stock, unit, icon } = req.body;
    
    const product = await prisma.product.create({
      data: { sku, name, category, price, costPrice, stock, unit, icon }
    });
    
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Update product (Admin Only)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { sku, name, category, price, costPrice, stock, unit, icon } = req.body;

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { sku, name, category, price, costPrice, stock, unit, icon }
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete product (Admin Only)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
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
