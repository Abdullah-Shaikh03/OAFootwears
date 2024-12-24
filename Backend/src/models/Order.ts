import mongoose, { Schema } from "mongoose";
import { IOrder } from "../utils/interface";

const OrderSchema: Schema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true, default: "Pending" },
    paymentStatus: { type: String, required: true, default: "Unpaid" },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
