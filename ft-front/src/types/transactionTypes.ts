import { Category } from "./categoryTypes";

export interface Transaction {
    _id: string;
    user_id: string;
    amount: number;
    category: Category;
    date: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}