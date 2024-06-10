import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { Goal } from '../../types/goalTypes';

export const fetchGoals = createAsyncThunk(
    'goals/fetchGoals',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/goals');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const addGoal = createAsyncThunk(
    'goals/addGoal',
    async (goal: Omit<Goal, '_id'>, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/goals', goal);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const updateGoal = createAsyncThunk(
    'goals/updateGoal',
    async (goal: Goal, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/goals/${goal._id}`, goal);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const deleteGoal = createAsyncThunk(
    'goals/deleteGoal',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/goals/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);
