import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/slices/products-slices";
import orderReducer from "./orders/slices/orders-slices.ts";

export const store = configureStore({
  reducer: {
    product: productReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
