import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],

    orderTime: { type: Date, default: Date.now },
    totalPrice: { type: Number, default: 0 },
    paymentStatus: { type: String },
    paymentMethod: { type: String },
  },
  { timestamps: true, collection: 'orders' },
);
