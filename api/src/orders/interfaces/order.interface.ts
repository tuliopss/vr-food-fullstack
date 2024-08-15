import { Document } from 'mongoose';
import { OrderPaymentStatus } from '../enums/order-pay-status.enum';
import { IProduct } from 'src/product/interfaces/Product.interface';
import { OrderPaymentMethod } from '../enums/order-payment-method.enum';

export interface IOrder extends Document {
  orderItems: IOrderItem[];
  orderTime: Date;
}

export interface IOrderItem {
  product: IProduct;
  quantity: number;
}
