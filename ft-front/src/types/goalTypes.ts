export interface Goal {
    _id: string;
    userId: string;
    name: string;
    amount: number;
    achieved: boolean;
    startDate: string;
    achievedDate?: string;
    createdAt: string;
    updatedAt: string;
}