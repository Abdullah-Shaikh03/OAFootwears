import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { dbConnect } from './src/config/dbConfig';
import { errorHandler } from './src/utils/errorHandler';
import { sessionMiddleware } from './src/config/session';
import routes from './src/routes';
import logger from './src/utils/loggers';
import 'colors';

dotenv.config();

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(sessionMiddleware);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Connect to MongoDB
dbConnect();

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`.bgCyan);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
  });
});

export default app;