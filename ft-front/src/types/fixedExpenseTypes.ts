import { Category } from "./categoryTypes";

export interface FixedExpense {
    _id: string;
    userId: string;
    name: string;
    category: Category;
    amount: number;
    createdAt: string;
    updatedAt: string;
}