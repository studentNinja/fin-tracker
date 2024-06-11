import { createSlice } from '@reduxjs/toolkit';
import { fetchGoals, addGoal, updateGoal, deleteGoal } from './goalsThunks';
import { Goal } from '../../types/goalTypes';

interface GoalsState {
    goals: Goal[];
    loading: boolean;
    error: string | null;
}

const initialState: GoalsState = {
    goals: [],
    loading: false,
    error: null,
};

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGoals.fulfilled, (state, action) => {
                state.goals = action.payload;
                state.loading = false;
            })
            .addCase(fetchGoals.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(addGoal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addGoal.fulfilled, (state, action) => {
                state.goals.push(action.payload);
                state.loading = false;
            })
            .addCase(addGoal.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(updateGoal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                const index = state.goals.findIndex(goal => goal._id === action.payload._id);
                if (index !== -1) {
                    state.goals[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(deleteGoal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.goals = state.goals.filter(goal => goal._id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export default goalsSlice.reducer;
