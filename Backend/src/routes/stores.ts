import express from 'express';
import { createStore, getStores, getStoreById, updateStore, deleteStore } from '../controllers/storeController';
import { authenticate } from '../middlewares/auth';
import { authorizeRoles } from '../middlewares/roles';

const router = express.Router();

router.post('/', authenticate, authorizeRoles('admin'), createStore);
router.get('/', authenticate, getStores);
router.get('/:id', authenticate, getStoreById);
router.put('/:id', authenticate, authorizeRoles('admin'), updateStore);
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteStore);

export default router;

