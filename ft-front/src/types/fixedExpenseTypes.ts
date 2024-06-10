import { Category } from "./categoryTypes";

export interface FixedExpense {
    _id: string;
    user: string;
    name: string;
    category: Category;
    amount: number;
    createdAt: string;
    updatedAt: string;
}