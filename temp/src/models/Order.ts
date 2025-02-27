import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    brandName: { type: String, required: true },
    article: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  }],
  total: { type: Number, required: true },
  shippingDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  status: { type: String, required: true, default: 'Pending' },
  deliveryStatus: { type: String, required: true, default: 'Processing', enum: ['Processing', 'Shipped', 'Delivered'] },
}, { timestamps: true });

export const Orders = mongoose.models.Order || mongoose.model('Order', OrderSchema);

