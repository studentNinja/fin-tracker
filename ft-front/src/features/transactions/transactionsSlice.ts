import { createSlice } from '@reduxjs/toolkit';
import { fetchTransactions, addTransaction} from './transactionThunks';
import { Transaction } from '../../types/transactionTypes';

interface TransactionsState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}

const initialState: TransactionsState = {
    transactions: [],
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
            });
        },
    });
    
    export default transactionsSlice.reducer;