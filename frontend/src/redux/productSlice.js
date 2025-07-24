import { createSlice } from '@reduxjs/toolkit';

// Initial product state
const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Start loading products
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // On successful product fetch
    fetchProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    // On product fetch error
    fetchProductsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} = productSlice.actions;

export default productSlice.reducer;