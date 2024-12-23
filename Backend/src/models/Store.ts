import mongoose, { Schema, Document } from 'mongoose';
import { IStore } from '../utils/interface';

const StoreSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  manager: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model<IStore>('Store', StoreSchema);

