import { IOrderItem } from "./IOrderItem";

export interface IOrder {
  _id: string;
  orderItems: IOrderItem[];
  orderTime: Date;

  totalPrice: number;

  paymentStatus: String;
  paymentMethod: String;
  isDelivery: Boolean;
  customer: String;
}
