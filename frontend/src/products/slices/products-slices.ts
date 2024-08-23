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
  async (_, thunkAPI) => {
    const response = await productsService.getAllProducts();

    // if (response.error) {
    //   return thunkAPI.rejectWithValue(response.error.message);
    // }
    return response;
  }
);

export const createProduct = createAsyncThunk<IProduct, IProduct>(
  "product/create",
  async (data, thunkAPI) => {
    const response = await productsService.createProduct(data);

    if (!response) {
      return thunkAPI.rejectWithValue("Erro ao cadastrar item");
    }
    return response;
  }
);
export const editProduct = createAsyncThunk<IProduct, IProduct>(
  "product/edit",
  async (productData, thunkAPI) => {
    const data: IProduct = {
      _id: productData._id,
      title: productData.title,
      quantity: productData.quantity,
      price: productData.price,
    };
    const response = await productsService.editProduct(productData._id, data);

    if (!response) {
      return thunkAPI.rejectWithValue("Erro ao cadastrar item");
    }
    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id: string, thunkAPI) => {
    const response = await productsService.deleteProduct(id);
    return id;

    // if (!response) {
    //   return thunkAPI.rejectWithValue("Erro ao excluir item");
    // }

    return response;
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
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.products = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.product = {};
      })
      .addCase(createProduct.pending, (state, action) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.product = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.product = {};
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.products = state.products.filter((product) => {
          return product._id !== action.payload;
        });
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.product = {};
      })
      .addCase(editProduct.pending, (state, action) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.product = action.payload;
        state.products = state.products.map((product) => {
          if (product._id === action.payload._id) {
            return { ...product, ...action.payload };
          }

          return product;
        });
        // state.products = state.products.map((product) => {
        //   if (product._id !== action.payload._id) {
        //     return { ...product, ...action.payload };
        //   }
        //   return product;
        // });
      });
  },
});

export const { resetMessage } = productSlice.actions;
export default productSlice.reducer;
