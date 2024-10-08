import { apiUrl, requestConfig } from "../../utils/api-request-config";
import { IProduct } from "../interfaces/IProduct";

const getAllProducts = async (): Promise<IProduct[]> => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(`${apiUrl}/products`, config);

    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getProductById = async (id: string): Promise<IProduct> => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(`${apiUrl}/products/${id}`, config);

    return await res.json();
  } catch (error) {
    console.log(error);
    return {} as IProduct;
  }
};

const createProduct = async (data: IProduct): Promise<IProduct | undefined> => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(`${apiUrl}/products`, config);

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (id: string): Promise<void> => {
  const config = requestConfig("DELETE", null);

  try {
    const res = await fetch(`${apiUrl}/products/${id}`, config);

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const editProduct = async (
  id: string,
  data: IProduct
): Promise<IProduct | undefined> => {
  const config = requestConfig("PATCH", data);

  try {
    const res = await fetch(`${apiUrl}/products/${id}`, config);

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
export const productsService = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  editProduct,
};
