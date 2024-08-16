import { Document, ObjectId } from 'mongoose';

export interface IProduct extends Document {
  _id: ObjectId | string;
  title: string;
  quantity: number;
  price: number;
}
