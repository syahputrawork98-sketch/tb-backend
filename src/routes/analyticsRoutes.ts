import { Router } from 'express';
import { getSummary, getSalesChart } from '../controllers/analyticsController';
import { authenticateToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Only admin can access analytics
router.get('/summary', (authenticateToken as any), (isAdmin as any), (getSummary as any));
router.get('/chart', (authenticateToken as any), (isAdmin as any), (getSalesChart as any));

export default router;
