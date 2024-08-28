import { IProduct } from "../../products/interfaces/IProduct";

export interface IOrderItem {
  _id: string;
  idProduct: IProduct;
  // product: IProduct;
  quantity: number;
  totalPrice: number;
}
