import { createSlice } from '@reduxjs/toolkit';
import { FixedExpense } from '../../types/fixedExpenseTypes';
import { addFixedExpense, deleteFixedExpense, fetchFixedExpenses, updateFixedExpense } from './fixedExpensesThunks';

interface FixedExpensesState {
    fixedExpenses: FixedExpense[];
    loading: boolean;
    error: string | null;
}

const initialState: FixedExpensesState = {
    fixedExpenses: [],
    loading: false,
    error: null,
};



const fixedExpensesSlice = createSlice({
    name: 'fixedExpenses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFixedExpenses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFixedExpenses.fulfilled, (state, action) => {
                state.fixedExpenses = action.payload;
                state.loading = false;
            })
            .addCase(fetchFixedExpenses.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(addFixedExpense.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFixedExpense.fulfilled, (state, action) => {
                state.fixedExpenses.push(action.payload);
                state.loading = false;
            })
            .addCase(addFixedExpense.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(updateFixedExpense.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateFixedExpense.fulfilled, (state, action) => {
                const index = state.fixedExpenses.findIndex(fixedExpense => fixedExpense._id === action.payload._id);
                if (index !== -1) {
                    state.fixedExpenses[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateFixedExpense.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(deleteFixedExpense.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFixedExpense.fulfilled, (state, action) => {
                state.fixedExpenses = state.fixedExpenses.filter(fixedExpense => fixedExpense._id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteFixedExpense.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export default fixedExpensesSlice.reducer;
