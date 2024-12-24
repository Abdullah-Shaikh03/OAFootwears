import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.session.user || !req.session.user.email) {
    next(new AppError('Unauthorized', 401));
    return;
  }
  next();
};