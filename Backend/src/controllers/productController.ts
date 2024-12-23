import { Request, Response } from 'express';
import Product from '../models/Product';
import { IProduct } from '../utils/interface';
import dotenv from 'dotenv';

dotenv.config();

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: IProduct = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products: IProduct[] = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching products', error });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: IProduct | null = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching product', error });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: IProduct | null = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: IProduct | null = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product', error });
  }
};

