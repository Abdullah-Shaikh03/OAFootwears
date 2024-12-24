import { Request, Response } from 'express';
import Order from '../models/Order';
import { IOrder } from '../utils/interface';
import dotenv from 'dotenv';

dotenv.config();

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: IOrder = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error });
  }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders: IOrder[] = await Order.find().populate('user').populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching orders', error });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: IOrder | null = await Order.findById(req.params.id).populate('user').populate('products.product');
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching order', error });
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const order: IOrder | null = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order status', error });
  }
};

