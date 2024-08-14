import { Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  quantity: number;
  price: number;
}
