import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import transactionsReducer from '../features/transactions/transactionsSlice';
import goalTransactionsReducer from '../features/goalTransactions/goalTransactionsSlice';
import fixedExpensesReducer from '../features/fixedExpenses/fixedExpensesSlice'
import goalsReducer from '../features/goals/goalsSlice'
import incomesReducer from '../features/income/incomeSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        transactions: transactionsReducer,
        goalTransactions: goalTransactionsReducer,
        fixedExpenses: fixedExpensesReducer,
        goals: goalsReducer,
        incomes: incomesReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
