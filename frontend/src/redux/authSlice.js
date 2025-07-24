import { createSlice } from '@reduxjs/toolkit';

// Initial state for user authentication
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Called when user logs in
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Called on logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions for use in components
export const { loginSuccess, logout } = authSlice.actions;

// Export reducer to be added to the store
export default authSlice.reducer;