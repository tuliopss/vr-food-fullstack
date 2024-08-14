import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IProduct } from '../interfaces/Product.interface';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
// import { EmployeeDto } from 'src/dtos/employee.dto';
// import { UpdateEmployeeDto } from 'src/dtos/updateEmployee.dto';
// import { IEmployee } from 'src/interfaces/employee.interface';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel('product') private readonly productModel: Model<IProduct>,
  ) {}

  async getAllProducts(): Promise<IProduct[]> {
    return await this.productModel.find({}, { __v: false }).exec();
  }

  async getProductById(id: string): Promise<IProduct> {
    return await this.productModel.findById(id, { __v: false });
  }

  async createProduct(newProduct: CreateProductDto): Promise<IProduct> {
    try {
      const createdProduct = new this.productModel(newProduct);
      return await createdProduct.save();
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async deleteProduct(id: string) {
    return await this.productModel.findOneAndDelete({ _id: id });
  }

  async updateProduct(
    id: string,
    newProduct: UpdateProductDto,
  ): Promise<IProduct> {
    return await this.productModel.findByIdAndUpdate(
      { _id: id },
      { $set: newProduct },
      { new: true },
    );
  }

  //   async editEmployee(
  //     id: string,
  //     newEmployee: UpdateProductDto,
  //   ): Promise<IProduct> {
  //     return await this.productModel.findByIdAndUpdate(id, newEmployee);
  //   }
}
