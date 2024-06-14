import { Category } from "./categoryTypes";

export interface FixedExpense {
    _id: string;
    name: string;
    amount: number;
    userId: string; 
    category: Category; 
    createdAt: string;
    updatedAt: string;
  }
