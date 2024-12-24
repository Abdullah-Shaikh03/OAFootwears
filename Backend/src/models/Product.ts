import mongoose, { Schema } from "mongoose";
import { IProduct } from "../utils/interface";

const ProductSchema: Schema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    inStock: {
      type: Number,
      required: true,
      default: 0,
    },
    imageUrls: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
