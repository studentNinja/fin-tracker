import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { User } from '../../types/userTypes';


interface UserState {
    userInfo: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    userInfo: null,
    loading: false,
    error: null,
};

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

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export default userSlice.reducer;
