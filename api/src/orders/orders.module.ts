import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { OrderRepository } from './repository/order.repository';
import { ProductModule } from 'src/product/product.module';
import { OrderItemSchema } from './schemas/orderItem.schema';
import { ProductSchema } from 'src/product/entities/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'orderItem', schema: OrderItemSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ProductModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
