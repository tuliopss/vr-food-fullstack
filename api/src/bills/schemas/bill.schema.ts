import * as mongoose from 'mongoose';

export const BillSchema = new mongoose.Schema(
  {
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    totalPrice: { type: Number },
    paymentStatus: { type: String },
    paymentMethod: { type: String },
    customer: { type: String },
  },
  { timestamps: true, collection: 'orders' },
);
