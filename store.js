import { configureStore } from '@reduxjs/toolkit';
import productReducer from './products/productSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
