import { Request, Response } from 'express';
import Store from '../models/Store';
import { IStore } from '../utils/interface';
import dotenv from 'dotenv';

dotenv.config();

export const createStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const store: IStore = new Store(req.body);
    await store.save();
    res.status(201).json(store);
  } catch (error) {
    res.status(400).json({ message: 'Error creating store', error });
  }
};

export const getStores = async (req: Request, res: Response): Promise<void> => {
  try {
    const stores: IStore[] = await Store.find().populate('manager');
    res.status(200).json(stores);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching stores', error });
  }
};

export const getStoreById = async (req: Request, res: Response): Promise<void> => {
  try {
    const store: IStore | null = await Store.findById(req.params.id).populate('manager');
    if (!store) {
      res.status(404).json({ message: 'Store not found' });
      return;
    }
    res.status(200).json(store);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching store', error });
  }
};

export const updateStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const store: IStore | null = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!store) {
      res.status(404).json({ message: 'Store not found' });
      return;
    }
    res.status(200).json(store);
  } catch (error) {
    res.status(400).json({ message: 'Error updating store', error });
  }
};

export const deleteStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const store: IStore | null = await Store.findByIdAndDelete(req.params.id);
    if (!store) {
      res.status(404).json({ message: 'Store not found' });
      return;
    }
    res.status(200).json({ message: 'Store deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting store', error });
  }
};

