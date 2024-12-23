import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrderStatus } from '../controllers/orderController';
import { authenticate } from '../middlewares/auth';
import { authorizeRoles } from '../middlewares/roles';

const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/', authenticate, authorizeRoles('admin', 'store_manager'), getOrders);
router.get('/:id', authenticate, getOrderById);
router.put('/:id/status', authenticate, authorizeRoles('admin', 'store_manager'), updateOrderStatus);

export default router;

