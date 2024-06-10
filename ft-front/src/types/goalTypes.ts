export interface Goal {
    _id: string;
    user_id: string;
    name: string;
    amount: number;
    achieved: boolean;
    startDate: string;
    achievedDate?: string;
    createdAt: string;
    updatedAt: string;
}