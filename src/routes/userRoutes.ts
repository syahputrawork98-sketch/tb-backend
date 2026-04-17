import { Router } from 'express';
import { getUsers, createUser, deleteUser } from '../controllers/userController';
import { authenticateToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Only admin can manage users
router.get('/', (authenticateToken as any), (isAdmin as any), (getUsers as any));
router.post('/', (authenticateToken as any), (isAdmin as any), (createUser as any));
router.delete('/:id', (authenticateToken as any), (isAdmin as any), (deleteUser as any));

export default router;
