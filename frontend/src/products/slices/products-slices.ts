import { IProduct } from "../interfaces/IProduct";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productsService } from "../services/products-service";

interface ProductState {
  products: IProduct[];
  product: IProduct | {};
  error: boolean;
  success: boolean;
  loading: boolean;
  message: string | null;
}
const initialState: ProductState = {
  products: [],
  product: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};
export const getAllProducts = createAsyncThunk<IProduct[]>(
  "product/getAll",
  async () => {
    const data = await productsService.getAllProducts();
    console.log(data);
    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.loading = false;
          state.success = true;
          state.error = false;
          state.products = action.payload;
        }
      );
  },
});

export const { resetMessage } = productSlice.actions;
export default productSlice.reducer;
