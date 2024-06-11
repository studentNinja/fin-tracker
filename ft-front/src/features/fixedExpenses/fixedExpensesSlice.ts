import { createSlice } from '@reduxjs/toolkit';
import { fetchFixedExpenses, fetchFixedExpenseById, addFixedExpense, updateFixedExpense, deleteFixedExpense } from './fixedExpensesThunks';
import { FixedExpense } from '../../types/fixedExpenseTypes';

interface FixedExpensesState {
    fixedExpenses: FixedExpense[];
    selectedFixedExpense: FixedExpense | null;
    loading: boolean;
    error: string | null;
}

const initialState: FixedExpensesState = {
    fixedExpenses: [],
    selectedFixedExpense: null,
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
            .addCase(fetchFixedExpenseById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFixedExpenseById.fulfilled, (state, action) => {
                state.selectedFixedExpense = action.payload;
                state.loading = false;
            })
            .addCase(fetchFixedExpenseById.rejected, (state, action) => {
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
