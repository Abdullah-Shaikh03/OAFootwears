import dotenv from 'dotenv';
import pino from 'pino';

dotenv.config();

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
  level: process.env.LOG_LEVEL || 'info'
});

export default logger;