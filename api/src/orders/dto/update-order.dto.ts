// import { PartialType } from '@nestjs/mapped-types';
// import { CreateOrderDto } from './create-order.dto';

import { IOrder } from '../interfaces/order.interface';
import { IOrderItem } from '../interfaces/orderItem.interface';

export class UpdateOrderDto {
  orderItems?: IOrderItem[];
  orderTime?: Date;
  totalPrice?: number;
}
