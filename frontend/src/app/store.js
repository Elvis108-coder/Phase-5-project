// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/slices/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
