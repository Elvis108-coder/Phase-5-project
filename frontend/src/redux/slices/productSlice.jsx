import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/productService';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  pagination: {
    total: 0,
    pages: 0,
    current_page: 1,
    per_page: 10,
  },
};

// GET ALL
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (queryParams = {}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productService.getAllProducts(token, queryParams);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// GET ONE
export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productService.getProductById(id, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// CREATE
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productService.createProduct(productData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// UPDATE
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, productData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productService.updateProduct(id, productData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// DELETE
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await productService.deleteProduct(id, token);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = {
          total: action.payload.total,
          pages: action.payload.pages,
          current_page: action.payload.current_page,
          per_page: action.payload.per_page,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.products.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) {
          state.products[idx] = action.payload;
        }
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p.id !== action.payload);
      })

      .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
