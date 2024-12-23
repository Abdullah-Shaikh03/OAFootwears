import express from 'express';
import authRoutes from './auth';
import productRoutes from './products';
import orderRoutes from './orders';
import inventoryRoutes from './inventory';
import storeRoutes from './stores';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/stores', storeRoutes);

export default router;