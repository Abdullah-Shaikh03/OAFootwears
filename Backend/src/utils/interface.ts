import { Document } from "mongoose";
import mongoose from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  name: string;
  googleId?: string;
  otp?: string;
  otpExpiresAt?: Date;
  role: "admin" | "store_manager" | "user";
}

export interface IInventory extends Document {
  product: mongoose.Types.ObjectId;
  quantity: number;
  store: mongoose.Types.ObjectId;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  products: Array<{
    product: mongoose.Types.ObjectId;
    quantity: number;
  }>;
  totalAmount: number;
  status: string;
  paymentStatus: string;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  sku: string;
  inStock: number;
}

export interface IStore extends Document {
  name: string;
  address: string;
  manager: mongoose.Types.ObjectId;
}