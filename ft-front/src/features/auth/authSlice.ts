import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { setTokenWithExpiry, getTokenWithExpiry } from '../../utils/tokenUtils';

interface User {
    _id: string;
    username: string;
    email: string;
    initial_capital: number;
    saving_goal: number;
    registration_date: string;
    transactions: string[];
    fixed_expenses: string[];
    goals: string[];
}

interface AuthState {
    token: string | null;
    userInfo: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: { msg: string } | string | null;
}

const token = getTokenWithExpiry('token');

const initialState: AuthState = {
    token: token,
    userInfo: null,
    isAuthenticated: !!token,
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData: { username: string; email: string; password: string; initialCapital: number }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/register', userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/login', credentials);
            const { token, user } = response.data;
            setTokenWithExpiry('token', token, 3600 * 1000);
            return { token, user };
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.userInfo = null;
            state.isAuthenticated = false;
        },
        setAuthState: (state, action) => {
            state.token = action.payload.token;
            state.userInfo = action.payload.user;
            state.isAuthenticated = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.userInfo = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
