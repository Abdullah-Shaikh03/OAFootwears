import Razorpay from 'razorpay';
import crypto from 'crypto';
import logger from '../utils/loggers';
import { AppError } from '../utils/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createOrder = async (amount: number, currency: string = 'INR')=> {
  try {
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    logger.error('Error creating Razorpay order:', error);
    throw new AppError('Payment initiation failed', 500);
  }
};

export const verifyPayment = (razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string): boolean => {
  const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
  shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
  const digest = shasum.digest('hex');

  if (digest !== razorpaySignature) {
    throw new AppError('Invalid payment signature', 400);
  }

  return true;
};