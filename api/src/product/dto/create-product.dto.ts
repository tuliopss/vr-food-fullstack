import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}
