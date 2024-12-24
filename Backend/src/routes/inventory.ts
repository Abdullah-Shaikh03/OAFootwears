import express from 'express';
import { updateInventory, getInventory, getInventoryByStore } from '../controllers/inventoryController';
import { authenticate } from '../middlewares/auth';
import { authorizeRoles } from '../middlewares/roles';

const router = express.Router();

router.put('/', authenticate, authorizeRoles('admin', 'store_manager'), updateInventory);
router.get('/', authenticate, authorizeRoles('admin'), getInventory);
router.get('/:storeId', authenticate, authorizeRoles('admin', 'store_manager'), getInventoryByStore);

export default router;

