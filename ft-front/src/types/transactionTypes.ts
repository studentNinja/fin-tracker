import { Category } from "./categoryTypes";

export interface Transaction{
    _id: string;
    userId: string;
    amount: number;
    category: Category;
    date: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface TransactionsState {
    transactions: Transaction[];
    selectedTransaction: Transaction | null;
    loading: boolean;
    error: string | null;
}