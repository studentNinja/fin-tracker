import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../api/axiosInstance';
import { UserState } from '../../types/userTypes'

const initialState: UserState = {
    userInfo: null,
    loading: false,
    error: null,
};

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/users/profile');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data);
        } else {
            return rejectWithValue('An unexpected error occurred');
        }
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export default userSlice.reducer;
