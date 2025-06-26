import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { loading: false, products: [], error: '' };
let storedProducts = {};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, text }) => {
    const key = `${page}-${text}`;
    if (storedProducts[key]) {
      return storedProducts[key];
    }

    const response = await axios.get(
      `https://dummyjson.com/products/search?q=${text}&limit=10&skip=${
        page * 10
      }`,
    );

    storedProducts[key] = response.data;
    return response.data;
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.error = '';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
