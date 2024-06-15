export interface Income {
    _id: string;
    userId: string;
    source: string;
    amount: number;
    date: string;
    createdAt: string;
    updatedAt: string;
    category: 'income';
}

export interface IncomeState {
    incomes: Income[];
    loading: boolean;
    error: string | null;
}