import { IProduct } from 'src/product/interfaces/Product.interface';
import { OrderPaymentStatus } from '../enums/order-pay-status.enum';
import { OrderPaymentMethod } from '../enums/order-payment-method.enum';

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
interface IOrderItem {
  idProduct: string;
  quantity: number;
}

export class CreateOrderDto {
  orderProducts: IOrderItem[];
  orderTime: Date;
}
