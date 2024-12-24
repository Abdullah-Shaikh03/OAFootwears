import express from 'express';
import authRoutes from './auth';
import productRoutes from './products';
import orderRoutes from './orders';
import inventoryRoutes from './inventory';
import storeRoutes from './stores';
import { uploadDocument, deleteDocument } from '../services/documentService';
import { authenticate } from '../middlewares/auth';
import { authorizeRoles } from '../middlewares/roles';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/stores', storeRoutes);

// Document routes
router.post('/documents', authenticate, authorizeRoles('admin', 'store_manager'), uploadDocument);
router.delete('/documents', authenticate, authorizeRoles('admin'), deleteDocument);

export default router;