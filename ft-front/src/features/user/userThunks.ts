import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/users/profile');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    async (
        { currentPassword, newPassword }: { currentPassword: string; newPassword: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.put('/users/update-password', {
                currentPassword,
                newPassword,
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete('/users/delete');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);
