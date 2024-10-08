import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { validationsParamsPipe } from './commom/pipes/validations-params-pipe.pipe';
import { CreateOrderItemDto } from './dto/create-orderItem.dto';
// import { UpdateOrderStatusDTO } from './dto/update-orderStatus.dto';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Post('/orderItem')
  createOrderItem(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.ordersService.createOrderItem(createOrderItemDto);
  }

  @Get('/')
  async findAllOrders() {
    return await this.ordersService.findAllOrders();
  }

  @Get(':id')
  async findOrderById(@Param('id', validationsParamsPipe) id: string) {
    return await this.ordersService.findOrderById(id);
  }

  @Get('item/:id')
  async findOrderItemById(@Param('id', validationsParamsPipe) id: string) {
    return await this.ordersService.findOrderItemById(id);
  }

  @Patch('bill/:id')
  async calcTotalPriceOrder(@Param('id', validationsParamsPipe) id: string) {
    return await this.ordersService.calcTotalPriceOrder(id);
  }

  // @Patch('/status/:id')
  // @UsePipes(ValidationPipe)
  // async updateOrderStatus(
  //   @Param('id', validationsParamsPipe) id: string,
  //   @Body() updateOrderStatusDTO: UpdateOrderStatusDTO,
  // ) {
  //   return this.ordersService.updateOrderStatus(id, updateOrderStatusDTO);
  // }

  @Patch('/cancel/:id')
  async cancelOrder(@Param('id') id: string) {
    return this.ordersService.cancelOrder(id);
  }

  @Delete('/:id')
  async deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }
}
