import * as mongoose from 'mongoose';

export const OrderItemSchema = new mongoose.Schema(
  {
    idProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: { type: Number },
  },
  { timestamps: true, collection: 'ordersItems' },
);
