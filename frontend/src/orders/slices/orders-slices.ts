import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ordersService } from "../services/orders-service";
import { IOrder } from "../interfaces/IOrder";

interface OrderState {
  orders: IOrder[];
  order: IOrder | {};
  error: boolean;
  success: boolean;
  loading: boolean;
  message: string | null;
}

const initialState: OrderState = {
  orders: [],
  order: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};
export const getAllOrders = createAsyncThunk<IOrder[]>(
  "order/getAll",
  async (_, thunkAPI) => {
    const response = await ordersService.getAllOrders();
    // if (response.error) {
    //   return thunkAPI.rejectWithValue(response.error.message);
    // }
    return response;
  }
);

export const createProduct = createAsyncThunk<IOrder, IOrder>(
  "product/create",
  async (data, thunkAPI) => {
    const response = await ordersService.createProduct(data);

    if (!response) {
      return thunkAPI.rejectWithValue("Erro ao cadastrar item");
    }
    return response;
  }
);
export const editProduct = createAsyncThunk<IOrder, IOrder>(
  "product/edit",
  async (productData, thunkAPI) => {
    const data: IOrder = {
      _id: productData._id,
      title: productData.title,
      quantity: productData.quantity,
      price: productData.price,
    };
    const response = await ordersService.editProduct(productData._id, data);

    if (!response) {
      return thunkAPI.rejectWithValue("Erro ao cadastrar item");
    }
    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id: string, thunkAPI) => {
    const response = await ordersService.deleteProduct(id);
    return id;

    // if (!response) {
    //   return thunkAPI.rejectWithValue("Erro ao excluir item");
    // }

    return response;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.orders = action.payload;
      });
    //       .addCase(createProduct.rejected, (state, action) => {
    //         state.loading = false;
    //         state.success = false;
    //         state.error = true;
    //         state.product = {};
    //       })
    //       .addCase(createProduct.pending, (state, action) => {
    //         state.loading = true;
    //         state.success = false;
    //         state.error = false;
    //       })
    //       .addCase(createProduct.fulfilled, (state, action) => {
    //         state.loading = false;
    //         state.success = true;
    //         state.error = false;
    //         state.product = action.payload;
    //       })
    //       .addCase(deleteProduct.rejected, (state, action) => {
    //         state.loading = false;
    //         state.success = false;
    //         state.error = true;
    //         state.product = {};
    //       })
    //       .addCase(deleteProduct.pending, (state, action) => {
    //         state.loading = true;
    //         state.success = false;
    //         state.error = false;
    //       })
    //       .addCase(deleteProduct.fulfilled, (state, action) => {
    //         state.loading = false;
    //         state.success = true;
    //         state.error = false;
    //         state.products = state.products.filter((product) => {
    //           return product._id !== action.payload;
    //         });
    //       })
    //       .addCase(editProduct.rejected, (state, action) => {
    //         state.loading = false;
    //         state.success = false;
    //         state.error = true;
    //         state.product = {};
    //       })
    //       .addCase(editProduct.pending, (state, action) => {
    //         state.loading = true;
    //         state.success = false;
    //         state.error = false;
    //       })
    //       .addCase(editProduct.fulfilled, (state, action) => {
    //         state.loading = false;
    //         state.success = true;
    //         state.error = false;
    //         state.product = action.payload;
    //         state.products = state.products.map((product) => {
    //           if (product._id === action.payload._id) {
    //             return { ...product, ...action.payload };
    //           }

    //           return product;
    //         });
    //         // state.products = state.products.map((product) => {
    //         //   if (product._id !== action.payload._id) {
    //         //     return { ...product, ...action.payload };
    //         //   }
    //         //   return product;
    //         // });
    //       });
  },
});

export const { resetMessage } = orderSlice.actions;
export default orderSlice.reducer;
