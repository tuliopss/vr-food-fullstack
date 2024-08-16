import { IProduct } from 'src/product/interfaces/Product.interface';
import { Document } from 'mongoose';

export interface IOrderItem extends Document {
  _id: string;
  idProduct: IProduct;
  quantity: number;
  totalPrice: number;
}
