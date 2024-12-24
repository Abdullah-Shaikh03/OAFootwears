import { Request, Response } from 'express';
import Inventory from '../models/Inventory';
import { IInventory } from '../utils/interface';
import dotenv from 'dotenv';

dotenv.config();

export const updateInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, storeId, quantity } = req.body;
    let inventory: IInventory | null = await Inventory.findOne({ product: productId, store: storeId });
    
    if (inventory) {
      inventory.quantity = quantity;
      await inventory.save();
    } else {
      inventory = new Inventory({ product: productId, store: storeId, quantity });
      await inventory.save();
    }
    
    res.status(200).json(inventory);
  } catch (error) {
    res.status(400).json({ message: 'Error updating inventory', error });
  }
};

export const getInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const inventory: IInventory[] = await Inventory.find().populate('product').populate('store');
    res.status(200).json(inventory);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching inventory', error });
  }
};

export const getInventoryByStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId } = req.params;
    const inventory: IInventory[] = await Inventory.find({ store: storeId }).populate('product');
    res.status(200).json(inventory);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching inventory for store', error });
  }
};

