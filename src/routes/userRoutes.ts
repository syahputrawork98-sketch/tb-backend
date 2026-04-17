import { Router } from 'express';
import { getUsers, createUser, deleteUser, updateProfile } from '../controllers/userController';
import { authenticateToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Only admin can manage users
router.get('/', (authenticateToken as any), (isAdmin as any), (getUsers as any));
router.post('/', (authenticateToken as any), (isAdmin as any), (createUser as any));
router.delete('/:id', (authenticateToken as any), (isAdmin as any), (deleteUser as any));

// Every logged in user can update their own profile
router.patch('/profile', (authenticateToken as any), (updateProfile as any));

export default router;
