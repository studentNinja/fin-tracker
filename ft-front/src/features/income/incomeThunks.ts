import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { Income } from '../../types/incomeTypes';

export const fetchIncomes = createAsyncThunk(
    'incomes/fetchIncomes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/incomes');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);


export const addIncome = createAsyncThunk(
    'incomes/addIncome',
    async (income: Omit<Income, '_id'>, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/incomes', income);
            return response.data;
        } catch (error: any) {
            console.error('Error adding income:', error.response?.data || 'An error occurred');
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);



export const updateIncome = createAsyncThunk(
    'incomes/updateIncome',
    async (income: Income, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/incomes/${income._id}`, income);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const deleteIncome = createAsyncThunk(
    'incomes/deleteIncome',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/incomes/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);
