import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingController';
import { authenticateToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Everyone authenticated can view basic shop info
router.get('/', (authenticateToken as any), (getSettings as any));

// Only Admin can change settings
router.patch('/', (authenticateToken as any), (isAdmin as any), (updateSettings as any));

export default router;
