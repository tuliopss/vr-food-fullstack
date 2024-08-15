import { IProduct } from 'src/product/interfaces/Product.interface';
import { Document } from 'mongoose';

export interface IOrderItem extends Document {
  idProduct: IProduct;
  quantity: number;
}
