import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../api/authService';
import type { User, LoginPayload, RegisterPayload } from '../types';
import type { AxiosError } from 'axios';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

const token = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');

const initialState: AuthState = {
  user: storedUser ? (JSON.parse(storedUser) as User) : null,
  token,
  isLoading: false,
  isError: false,
  errorMessage: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginPayload, { rejectWithValue }) => {
    try {
      const data = await authService.loginUser(credentials);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message || 'Login failed. Please try again.';
      return rejectWithValue(message);
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterPayload, { rejectWithValue }) => {
    try {
      const data = await authService.registerUser(userData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message ||
        'Registration failed. Please try again.';
      return rejectWithValue(message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isError = false;
      state.errorMessage = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError(state) {
      state.isError = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Login ──────────────────────────────────────────
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      })
      // ── Register ───────────────────────────────────────
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
