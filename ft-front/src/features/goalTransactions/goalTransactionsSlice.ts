import { createSlice } from '@reduxjs/toolkit';
import { fetchAllGoalTransactions, fetchCurrentGoalTransactions, addGoalTransaction } from './goalTransactionsThunks';
import { GoalTransaction } from '../../types/goalTransactionTypes';



interface GoalTransactionsState {
    goalTransactionsCurrent: GoalTransaction[];
    goalTransactionsAll: GoalTransaction[];
    loading: boolean;
    error: string | null;
}

const initialState: GoalTransactionsState = {
    goalTransactionsCurrent: [],
    goalTransactionsAll: [],
    loading: false,
    error: null,
};


const goalTransactionsSlice = createSlice({
    name: 'goalTransactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllGoalTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllGoalTransactions.fulfilled, (state, action) => {
                state.goalTransactionsAll = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllGoalTransactions.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(fetchCurrentGoalTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentGoalTransactions.fulfilled, (state, action) => {
                state.goalTransactionsCurrent = action.payload;
                state.loading = false;
            })
            .addCase(fetchCurrentGoalTransactions.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })

            .addCase(addGoalTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addGoalTransaction.fulfilled, (state, action) => {
                state.goalTransactionsAll.push(action.payload);
                state.goalTransactionsCurrent.push(action.payload);
                state.loading = false;
            })
            .addCase(addGoalTransaction.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })

    },
});

export default goalTransactionsSlice.reducer;

