import { ProductService } from './../product/product.service';
import {
  BadRequestException,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IOrder } from './interfaces/order.interface';
import { isValidObjectId, model, Model } from 'mongoose';
import { OrderPaymentStatus } from './enums/order-pay-status.enum';

import { OrderRepository } from './repository/order.repository';
import { ProductRepository } from 'src/product/repository/product.repository';
import { IProduct } from 'src/product/interfaces/Product.interface';
@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<void> {
    try {
      createOrderDto.orderProducts || [];

      const orderProducts = await Promise.all(
        createOrderDto.orderProducts.map(async (order) => {
          const product = await this.productService.getProductById(
            order.idProduct,
          );

          return {
            idProduct: product._id.toString(),
            quantity: order.quantity,
          };
        }),
      );

      for (const product of orderProducts) {
        await this.checkProductQuantity(
          product.idProduct,
          // order.product._id.toString(),
          product.quantity,
        );
      }
      createOrderDto.orderTime = new Date();

      createOrderDto.orderProducts = orderProducts;

      const newOrder = await this.orderRepository.createOrder(createOrderDto);
      console.log(newOrder);
      newOrder.orderProducts.forEach(async (product) => {
        await this.productService.updateProductQuantitys(
          product.product.toString(),
          product.quantity,
        );
      });
      // return await this.productService.updateProduct
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllOrders(): Promise<IOrder[]> {
    try {
      const orders = await this.orderRepository.getAllOrders();

      if (orders.length === 0) {
        throw new NotFoundException('Não há pedidos realizados...');
      }

      return orders;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOrderById(id: string): Promise<IOrder> {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('ID inválido.');
      }
      const order = await this.orderRepository.getOrderById(id);

      if (!order) {
        throw new NotFoundException('Pedido não encontrado...');
      }

      return order;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // async updateOrderStatus(
  //   id: string,
  //   updateOrderStatusDto: UpdateOrderStatusDTO,
  // ) {
  //   try {
  //   } catch (error) {}
  // }

  async cancelOrder(id: string) {}

  async deleteOrder(id: string): Promise<void> {}

  async checkProductQuantity(
    idProduct: string,
    orderQuantity: number,
  ): Promise<Boolean> {
    const product = await this.productService.getProductById(idProduct);

    if (orderQuantity > product.quantity) {
      throw new BadRequestException(
        `Não há quantidade de ${product.title} suficiente (${product.quantity}) `,
      );
    }
    return true;
  }
}
