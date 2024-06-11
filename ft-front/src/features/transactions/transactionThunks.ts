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

export const fetchTransactionById = createAsyncThunk(
    'transactions/fetchTransactionById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/transactions/${id}`);
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

export const updateTransaction = createAsyncThunk(
    'transactions/updateTransaction',
    async (transaction: Transaction, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/transactions/${transaction._id}`, transaction);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const deleteTransaction = createAsyncThunk(
    'transactions/deleteTransaction',
    async (id: string, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/transactions/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);
