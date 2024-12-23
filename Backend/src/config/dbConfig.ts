import mongoose from 'mongoose';
import logger from '../utils/loggers';
import dotenv from 'dotenv';
import 'colors';

dotenv.config();

export const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info(`MongoDB Connected: ${mongoose.connection.host}`.bgGreen);
  } catch (error) {
    logger.error(`Error: ${(error as Error).message}`.bgRed.white);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected'.bgYellow);
});

mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB reconnected'.bgGreen);
});