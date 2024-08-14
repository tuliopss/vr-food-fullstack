import { Document } from 'mongoose';
import { OrderPaymentStatus } from '../enums/order-pay-status.enum';
import { IProduct } from 'src/product/interfaces/Product.interface';
import { OrderPaymentMethod } from '../enums/order-payment-method.enum';

export interface IOrder extends Document {
  orderProducts: { product: IProduct; quantity: number }[]; // Corrigido para um array
  orderTime: Date;
}
