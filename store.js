import { configureStore } from '@reduxjs/toolkit';
import productReducer from './products/ProductSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
