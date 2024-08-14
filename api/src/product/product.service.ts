import { ProductSchema } from './entities/schemas/product.schema';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { IProduct } from './interfaces/Product.interface';
import { ProductRepository } from './repository/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(createProductDto: CreateProductDto) {
    try {
      return await this.productRepository.createProduct(createProductDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllProducts() {
    try {
      const products = await this.productRepository.getAllProducts();

      if (products.length === 0) {
        throw new NotFoundException(`Não há produtos registrados.`);
      }

      return products;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getProductById(id: string) {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('ID inválido.');
      }

      const product = await this.productRepository.getProductById(id);

      if (!product) {
        throw new NotFoundException(`Produto não encontrado.`);
      }

      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      await this.getProductById(id);
      return await this.productRepository.updateProduct(id, updateProductDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateProductQuantitys(id: string, quantity: number) {
    const product = await this.getProductById(id);

    product.quantity -= quantity;

    await this.updateProduct(id, product);
  }

  async remove(id: string) {
    await this.getProductById(id);
    return await this.productRepository.deleteProduct(id);
  }
}
