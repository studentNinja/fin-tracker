import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { Transaction } from '../../types/transactionTypes';

export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/transactions');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (transaction: Omit<Transaction, '_id'>, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/transactions', transaction);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);