import mongoose, { Schema, Document } from 'mongoose';
import { IInventory } from '../utils/interface';

const InventorySchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  store: { type: Schema.Types.ObjectId, ref: 'Store', required: true }
}, { timestamps: true });

export default mongoose.model<IInventory>('Inventory', InventorySchema);

