import { Router } from 'express';
import { createTransaction, getTransactions } from '../controllers/transactionController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Staff only can access transactions
router.post('/', (authenticateToken as any), (createTransaction as any));
router.get('/', (authenticateToken as any), (getTransactions as any));

export default router;
