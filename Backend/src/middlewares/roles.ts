import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.session.user;
    if (!user || !user.role || !allowedRoles.includes(user.role)) {
      next(new AppError('Access denied', 403));
      return;
    }
    next();
  };
};