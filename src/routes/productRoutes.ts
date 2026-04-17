import { Router } from 'express';
import { getProducts, createProduct, updateStock, updateProduct, deleteProduct } from '../controllers/productController';
import { authenticateToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', (authenticateToken as any), (getProducts as any));
router.post('/', (authenticateToken as any), (isAdmin as any), (createProduct as any));
router.patch('/:id', (authenticateToken as any), (isAdmin as any), (updateProduct as any));
router.delete('/:id', (authenticateToken as any), (isAdmin as any), (deleteProduct as any));
router.patch('/:id/stock', (authenticateToken as any), (updateStock as any));

export default router;
