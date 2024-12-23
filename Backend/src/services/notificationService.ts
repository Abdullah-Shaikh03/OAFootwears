import axios from 'axios';
import logger from '../utils/loggers';
import dotenv from 'dotenv';

dotenv.config();
import { AppError } from '../utils/errorHandler';

const TATA_API_KEY = process.env.TATA_API_KEY;
const TATA_API_URL = 'https://api.tatacommunications.com/sms/v1/send';

export const sendSMS = async (to: string, body: string): Promise<void> => {
  try {
    const response = await axios.post(TATA_API_URL, {
      to,
      body,
      from: process.env.TATA_SENDER_ID,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TATA_API_KEY}`,
      },
    });

    if (response.data.status !== 'success') {
      throw new Error('Failed to send SMS');
    }

    logger.info('SMS sent successfully');
  } catch (error) {
    logger.error('Error sending SMS:', error);
    throw new AppError('Failed to send notification', 500);
  }
};