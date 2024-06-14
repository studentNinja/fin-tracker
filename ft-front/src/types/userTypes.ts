import { FixedExpense } from "./fixedExpenseTypes";
import { Goal } from "./goalTypes";
import { Transaction } from "./transactionTypes";
import {Income} from "./incomeTypes";

export interface UserState {
    userInfo: User | null;
    loading: boolean;
    error: string | null;
    updatePasswordSuccess: boolean,
    deleteUserSuccess: boolean,
}

export interface User {
    _id: string;
    username: string;
    email: string;
    initial_capital: number;
    saving_goal: number;
    registration_date: string;
    transactions: Transaction[];
    fixed_expenses: FixedExpense[];
    goals: Goal[];
    incomes: Income[];
}