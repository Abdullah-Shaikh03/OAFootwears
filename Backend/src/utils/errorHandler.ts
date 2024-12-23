import { Request, Response, NextFunction } from 'express';
import logger from './loggers';
import dotenv from 'dotenv';

dotenv.config();

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction): void => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  logger.error(`${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      stack: err.stack,
    });
  } else {
    // Don't leak error details in production
    res.status(err.statusCode).json({
      success: false,
      error: err.isOperational ? err.message : 'Something went wrong',
    });
  }
};