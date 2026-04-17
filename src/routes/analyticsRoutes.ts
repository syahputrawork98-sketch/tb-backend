import { Router } from 'express';
import { getSummary, getSalesChart, getCSDashboardStats } from '../controllers/analyticsController';
import { authenticateToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// 1. CS Stats (Accessible by all staff)
router.get('/cs-stats', (authenticateToken as any), (getCSDashboardStats as any));

// 2. Admin Analytics (Restricted)
router.get('/summary', (authenticateToken as any), (isAdmin as any), (getSummary as any));
router.get('/chart', (authenticateToken as any), (isAdmin as any), (getSalesChart as any));

export default router;
