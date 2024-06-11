import { createSlice } from '@reduxjs/toolkit';
import { fetchIncomes, addIncome, updateIncome, deleteIncome } from './incomeThunks';
import { Income } from '../../types/incomeTypes';

interface IncomesState {
    incomes: Income[];
    loading: boolean;
    error: string | null;
}

const initialState: IncomesState = {
    incomes: [],
    loading: false,
    error: null,
};

const incomesSlice = createSlice({
    name: 'incomes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIncomes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIncomes.fulfilled, (state, action) => {
                state.incomes = action.payload;
                state.loading = false;
            })
            .addCase(fetchIncomes.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(addIncome.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addIncome.fulfilled, (state, action) => {
                state.incomes.push(action.payload);
                state.loading = false;
            })
            .addCase(addIncome.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(updateIncome.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateIncome.fulfilled, (state, action) => {
                const index = state.incomes.findIndex(income => income._id === action.payload._id);
                if (index !== -1) {
                    state.incomes[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateIncome.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(deleteIncome.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteIncome.fulfilled, (state, action) => {
                state.incomes = state.incomes.filter(income => income._id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteIncome.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export default incomesSlice.reducer;
