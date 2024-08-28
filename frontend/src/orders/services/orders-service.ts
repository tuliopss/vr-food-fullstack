import { apiUrl, requestConfig } from "../../utils/api-request-config";
import { IOrder } from "../interfaces/IOrder";

async function getAllOrders(): Promise<IOrder[]> {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(`${apiUrl}/orders`, config);
    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

const createProduct = async (data: IOrder): Promise<IOrder | undefined> => {
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
  data: IOrder
): Promise<IOrder | undefined> => {
  const config = requestConfig("PATCH", data);

  try {
    const res = await fetch(`${apiUrl}/products/${id}`, config);

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
export const ordersService = {
  getAllOrders,
  createProduct,
  deleteProduct,
  editProduct,
};
