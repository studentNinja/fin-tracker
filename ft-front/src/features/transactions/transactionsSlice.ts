import { createSlice } from '@reduxjs/toolkit';
import { fetchTransactions, fetchTransactionById, addTransaction, updateTransaction, deleteTransaction } from './transactionThunks';
import { TransactionsState } from '../../types/transactionTypes';



const initialState: TransactionsState = {
    transactions: [],
    selectedTransaction: null,
    loading: false,
    error: null,
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload;
                state.loading = false;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(fetchTransactionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactionById.fulfilled, (state, action) => {
                state.selectedTransaction = action.payload;
                state.loading = false;
            })
            .addCase(fetchTransactionById.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(addTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.transactions.push(action.payload);
                state.loading = false;
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(updateTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                const index = state.transactions.findIndex(transaction => transaction._id === action.payload._id);
                if (index !== -1) {
                    state.transactions[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(deleteTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.transactions = state.transactions.filter(transaction => transaction._id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export default transactionsSlice.reducer;
