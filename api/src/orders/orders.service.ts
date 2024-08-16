import { CreateOrderItemDto } from './dto/create-orderItem.dto';
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
import { IOrderItem } from './interfaces/orderItem.interface';
@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<IOrder> {
    try {
      const orderItems = await Promise.all(
        createOrderDto.orderItems.map((itemDto) => {
          return this.createOrderItem(itemDto);
        }),
      );

      createOrderDto.orderItems = orderItems;

      createOrderDto.orderItems.forEach(async (orderItem) => {
        await this.productService.updateProductQuantitys(
          orderItem.idProduct.toString(),
          orderItem.quantity,
        );
      });

      return await this.orderRepository.createOrder(createOrderDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createOrderItem(item: any) {
    try {
      const product = await this.productService.getProductById(item.idProduct);

      await this.checkProductQuantity(product._id.toString(), item.quantity);

      const totalPriceItem = product.price * item.quantity;
      item.totalPrice = totalPriceItem;
      return await this.orderRepository.createOrderItem(item);
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
  async findOrderItemById(id: string): Promise<IOrderItem> {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('ID inválido.');
      }
      const orderItem = await this.orderRepository.getOrderItemById(id);

      if (!orderItem) {
        throw new NotFoundException('Pedido item não encontrado...');
      }

      return orderItem;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      await this.findOrderById(id);

      return await this.orderRepository.updateOrder(id, updateOrderDto);
    } catch (error) {}
  }

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

  async updateProductQuantity(idOrderItem: string) {
    const orderItem = await this.findOrderItemById(idOrderItem);
    const product = await this.productService.getProductById(
      orderItem.idProduct.toString(),
    );

    await this.productService.updateProductQuantitys(
      product._id.toString(),
      orderItem.quantity,
    );
  }

  async calcTotalPriceOrder(idOrder: string) {
    try {
      const order = await this.findOrderById(idOrder);
      // console.log('pedido', order);
      const items = await Promise.all(
        order.orderItems.map(async (item) => {
          return await this.findOrderItemById(item.toString());
        }),
      );

      items.map((item) => {
        order.totalPrice += item.totalPrice;
      });

      await this.updateOrder(idOrder, order);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
