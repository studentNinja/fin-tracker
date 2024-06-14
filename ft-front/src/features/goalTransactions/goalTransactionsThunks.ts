import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { GoalTransaction } from '../../types/goalTransactionTypes';

export const fetchAllGoalTransactions = createAsyncThunk(
    'goal-transactions/fetchAllGoalTransactions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/goal-transactions');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const fetchCurrentGoalTransactions = createAsyncThunk(
    'goal-transactions/fetchCurrentGoalTransactions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/goal-transactions/goal');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const addGoalTransaction = createAsyncThunk(
    'goal-transactions/addGoalTransaction',
    async (transaction: Omit<GoalTransaction, '_id' | 'goalId'>, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/goal-transactions', transaction);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);
