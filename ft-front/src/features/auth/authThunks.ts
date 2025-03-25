import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../api/axiosInstance';
import { User } from '../../types/userTypes';

interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  capital: number;
  saving_goal?: number;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface TokenResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterUserData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<TokenResponse>(
        '/auth/register',
        userData
      );
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data?.error || 'An error occurred';
        return rejectWithValue(error.response.status == 403 ? '403' : message);
      }
      return rejectWithValue('An error occurred');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<TokenResponse>(
        '/auth/login',
        credentials
      );
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          'Invalid credentials';
        return rejectWithValue(error.response.status == 403 ? '403' : message);
      }
      return rejectWithValue('An error occurred');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return rejectWithValue('No refresh token found');
      }

      const response = await axiosInstance.post<{ accessToken: string }>(
        '/auth/refresh',
        { refreshToken }
      );
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      return { accessToken };
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data?.error || 'An error occurred';
        return rejectWithValue(message);
      }
      return rejectWithValue('An error occurred');
    }
  }
);
