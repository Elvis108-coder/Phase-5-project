import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

import {jwtDecode} from 'jwt-decode';

// This imports the authService which contains the login and register functions.
// It also imports jwtDecode to decode JWT tokens.

const storedUser = localStorage.getItem('user');
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

// If a user is stored in localStorage, it parses the JSON string to an object.
// If not, it initializes the user state to null.
// The token is also retrieved from localStorage, or set to null if not present.
// This is used to maintain user state across page reloads.
// The initial state of the auth slice, which includes user information, token, loading state,
const initialState = {
    user: parsedUser?.access_token ? jwtDecode(parsedUser.access_token) : null,
    token: parsedUser ? parsedUser.access_token : null,
    loading: false,
    error: null,
};

// This creates an asynchronous thunk for logging in a user.
// It uses the authService to call the login function and handles the response.
// If the login is successful, it stores the user data in localStorage and returns the response.
// If it fails, it rejects with an error message.
export const login = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const response = await authService.login(credentials);
            localStorage.setItem('user', JSON.stringify(response));
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// This creates an asynchronous thunk for registering a new user.
// It uses the authService to call the register function and handles the response.
// If the registration is successful, it stores the user data in localStorage and returns the response.
// If it fails, it rejects with an error message.
export const register = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            const response = await authService.register(userData);
            localStorage.setItem('user', JSON.stringify(response));
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


// This creates a slice of the Redux store for authentication.
// It includes the initial state, reducers, and extra reducers for handling asynchronous actions.
// The slice manages the authentication state, including user information, token, loading state, and errors.
// The logout reducer clears the user and token from both the state and localStorage.
// It also handles the pending, fulfilled, and rejected states of the login and register thunks.
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user');
            state.user = null;
            state.token = null;
        }
    },
    // This handles the asynchronous actions for login and register.
    // It updates the loading state when the actions are pending,
    // sets the user and token when fulfilled, and handles errors when rejected.
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled,  (state, action) => {
                const decodedToken = jwtDecode(action.payload.access_token);
                state.loading = false;
                state.user = decodedToken;
                state.token = action.payload.access_token;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(register.fulfilled, (state, action) => {
                
                state.loading = false;
                state.user = null;
                state.token = null;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// This exports the logout action and the reducer for the auth slice.
export const { logout } = authSlice.actions;
export default authSlice.reducer;