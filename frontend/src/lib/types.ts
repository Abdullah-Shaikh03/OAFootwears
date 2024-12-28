import { Document, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId
  email: string;
  password: string;
  name: string;
  googleId?: string;
  otp?: string;
  otpExpiresAt?: Date;
  role: "admin" | "store_manager" | "user";
}

export interface IProduct extends Document {
    _id: Types.ObjectId
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  sku: string;
  inStock: number;
  imageUrls: string[];
}

export interface IStore extends Document {
    _id: Types.ObjectId
  name: string;
  address: string;
  manager: IUser["_id"];
}

export interface IInventory extends Document {
  product: IProduct["_id"];
  quantity: number;
  store: IStore["_id"];
}

export interface IOrder extends Document {
  user: IUser["_id"];
  products: Array<{
    product: IProduct["_id"];
    quantity: number;
  }>;
  totalAmount: number;
  status: string;
  paymentStatus: string;
}