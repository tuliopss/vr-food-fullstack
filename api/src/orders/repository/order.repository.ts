import { CreateOrderDto } from './../dto/create-order.dto';
import { IOrder } from './../interfaces/order.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { CreateOrderItemDto } from '../dto/create-orderItem.dto';
import { IOrderItem } from '../interfaces/orderItem.interface';
// import { EmployeeDto } from 'src/dtos/employee.dto';
// import { UpdateEmployeeDto } from 'src/dtos/updateEmployee.dto';
// import { IEmployee } from 'src/interfaces/employee.interface';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel('order') private readonly orderModel: Model<IOrder>,
    @InjectModel('orderItem')
    private readonly orderItemModel: Model<IOrderItem>,
    private readonly productService: ProductService,
  ) {}

  async getAllOrders(): Promise<IOrder[]> {
    return await this.orderModel.find({}, { __v: false }).exec();
  }

  async getOrderById(id: string): Promise<IOrder> {
    return await this.orderModel.findById(id, { __v: false });
  }

  async getOrderItemById(id: string): Promise<IOrderItem> {
    return await this.orderItemModel.findById(id, { __v: false });
  }

  async createOrder(newOrder: CreateOrderDto): Promise<IOrder> {
    try {
      const createdOrder = new this.orderModel(newOrder);

      return await createdOrder.save();
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async createOrderItem(newOrderItem: CreateOrderItemDto): Promise<IOrderItem> {
    try {
      const createdOrderItem = new this.orderItemModel(newOrderItem);

      return await createdOrderItem.save();
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async deleteOrder(id: string) {
    return await this.orderModel.findOneAndDelete({ _id: id });
  }

  //   async updateOrder(
  //     id: string,
  //     newOrder: UpdateOrderDto,
  //   ): Promise<IOrder> {
  //     return await this.orderModel.findByIdAndUpdate(
  //       { _id: id },
  //       { $set: newProduct },
  //       { new: true },
  //     );
  //   }
}
