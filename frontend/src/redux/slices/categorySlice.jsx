import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../services/categoryService';

const initialState = {
  categories: [],
  loading: false,
  error: null,
  success: false,
};

// GET ALL
export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await categoryService.getAllCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to fetch categories');
    }
  }
);

// CREATE
export const createCategory = createAsyncThunk(
  'categories/create',
  async ({ categoryData, token }, thunkAPI) => {
    try {
      return await categoryService.createCategory(categoryData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to create category');
    }
  }
);

// UPDATE
export const updateCategory = createAsyncThunk(
  'categories/update',
  async ({ id, categoryData, token }, thunkAPI) => {
    try {
      return await categoryService.updateCategory(id, categoryData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to update category');
    }
  }
);

// DELETE
export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async ({ id, token }, thunkAPI) => {
    try {
      return await categoryService.deleteCategory(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to delete category');
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCategoryState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories = state.categories.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories = state.categories.filter((cat) => cat.id !== action.payload.id);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCategoryState } = categorySlice.actions;
export default categorySlice.reducer;
