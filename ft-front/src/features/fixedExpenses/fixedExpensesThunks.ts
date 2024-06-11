import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { FixedExpense } from '../../types/fixedExpenseTypes';

export const fetchFixedExpenses = createAsyncThunk(
    'fixedExpenses/fetchFixedExpenses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/fixedexpenses');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const fetchFixedExpenseById = createAsyncThunk(
    'fixedExpenses/fetchFixedExpenseById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/fixedexpenses/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const addFixedExpense = createAsyncThunk(
    'fixedExpenses/addFixedExpense',
    async (fixedExpense: Omit<FixedExpense, '_id'>, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/fixedexpenses', fixedExpense);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const updateFixedExpense = createAsyncThunk(
    'fixedExpenses/updateFixedExpense',
    async (fixedExpense: FixedExpense, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/fixedexpenses/${fixedExpense._id}`, fixedExpense);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const deleteFixedExpense = createAsyncThunk(
    'fixedExpenses/deleteFixedExpense',
    async (id: string, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/fixedexpenses/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);
