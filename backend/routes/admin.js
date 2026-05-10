import express from 'express';
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getDashboardStats
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.put('/users', updateUserRole);
router.delete('/users', deleteUser);
router.get('/stats', getDashboardStats);

export default router;
