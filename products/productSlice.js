import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  products: [],
  error: '',
  hasMore: true,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ text, skip = 0 }) => {
    const isSearch = text && text.trim().length > 0;
    const url = isSearch
      ? `https://dummyjson.com/products/search?q=${text}&limit=10&skip=${skip}`
      : `https://dummyjson.com/products?limit=10&skip=${skip}`;

    const response = await axios.get(url);
    return { ...response.data, skip };
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts(state) {
      state.products = [];
      state.hasMore = true;
      state.error = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        const newProducts = action.payload.products || [];
        if (action.payload.skip === 0) {
          state.products = newProducts;
        } else {
          state.products = [...state.products, ...newProducts];
        }

        state.hasMore = newProducts.length === 10;
        state.error = '';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;
