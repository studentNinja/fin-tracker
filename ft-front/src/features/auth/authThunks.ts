import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

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

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: RegisterUserData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/register', userData);
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/login', credentials);
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
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

            const response = await axiosInstance.post('/auth/refresh', { refreshToken });
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            return { accessToken };
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);
