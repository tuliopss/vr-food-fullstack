import { apiUrl, requestConfig } from "../../utils/api-request-config";
import { IProduct } from "../interfaces/IProduct";

const getAllProducts = async (): Promise<IProduct[]> => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(`${apiUrl}/products`, config);

    return (await res.json()) as IProduct[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const productsService = {
  getAllProducts,
};
