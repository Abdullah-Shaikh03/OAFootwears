import express, { Request, Response, NextFunction } from 'express';
import { authenticate } from '../middlewares/auth';
import { authorizeRoles } from '../middlewares/roles';

const router = express.Router();

router.get('/', authenticate, (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.json({ message: 'Viewing products' });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, authorizeRoles('admin'), (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.json({ message: 'Adding a product (Admin only)' });
  } catch (error) {
    next(error);
  }
});

export default router;

