import { configureStore } from '@reduxjs/toolkit';

// Import slices
import authReducer from './authSlice';
import productReducer from './productSlice';
import userReducer from './userSlice';
import orderReducer from './orderSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,       // Handles authentication and admin state
    products: productReducer, // Manages product data for the dashboard
    users: userReducer,       // Manages user data
    orders: orderReducer      // Manages order data
  }
});

export default store;
