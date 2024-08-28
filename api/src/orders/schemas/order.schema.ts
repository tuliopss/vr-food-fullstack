import * as mongoose from 'mongoose';
import { OrderPaymentStatus } from '../enums/order-pay-status.enum';

export const OrderSchema = new mongoose.Schema(
  {
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
    orderTime: { type: Date, default: Date.now },
    totalPrice: { type: Number, default: 0 },
    paymentStatus: { type: String, default: OrderPaymentStatus.PENDING },
    paymentMethod: { type: String },
    isDelivery: { type: Boolean },
    customer: { type: String },
  },
  { timestamps: true, collection: 'orders' },
);
