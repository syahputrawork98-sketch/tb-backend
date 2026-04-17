import { Router } from 'express';
import { getProducts, createProduct, updateStock } from '../controllers/productController';
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware';

const router = Router();

// All STAFF can view products
router.get('/', (authenticateToken as any), (getProducts as any));

// Admin only can create products
router.post('/', (authenticateToken as any), (authorizeRole(['ADMIN']) as any), (createProduct as any));

// Staff can update stocks
router.patch('/:id/stock', (authenticateToken as any), (updateStock as any));

export default router;
