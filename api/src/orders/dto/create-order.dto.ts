import { IProduct } from 'src/product/interfaces/Product.interface';
import { OrderPaymentStatus } from '../enums/order-pay-status.enum';
import { OrderPaymentMethod } from '../enums/order-payment-method.enum';
import { IOrderItem } from '../interfaces/orderItem.interface';

// interface IOrderItem {
//   orders: {
//     idProduct: string;
//     quantity: number;
//   };
// }

// export class CreateOrderDto {
//   orders: IOrderItem[];
//   orderTime: Date;
// }

export class CreateOrderDto {
  orderItems: IOrderItem[];
  orderTime: Date;
}
