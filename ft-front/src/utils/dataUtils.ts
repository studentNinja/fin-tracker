import { User } from "../types/userTypes";
import { GoalTransaction } from "../types/goalTransactionTypes";
import { Goal } from "../types/goalTypes";
import { Transaction } from "../types/transactionTypes";
import { Category } from "../types/categoryTypes";
import { filterCurrentMonth, filterPrevMonth } from "./arrayUtils";
import { Income } from "../types/incomeTypes";

export function getSavedAmountCurrentGoal(goalTransactionsCurrent: GoalTransaction[]) {
    return goalTransactionsCurrent.reduce((res, curr) => res + curr.amount, 0);
}

export function getSavedAmountByCurrentMonthForGoal(goalTransactionsCurrent: GoalTransaction[]) {
    return filterCurrentMonth(goalTransactionsCurrent).reduce((res, curr) => res + curr.amount, 0);
}

export function getSavedAmountByPrevMonthForGoal(goalTransactionsCurrent: GoalTransaction[]) {
    return filterPrevMonth(goalTransactionsCurrent).reduce((res, curr) => res + curr.amount, 0);
}

export function getRecentGoal(user: User | null): Goal | null {
    if (!user || user.goals.length === 0) return null;

    let mostRecentGoal = user.goals[0];
    for (let i = 1; i < user.goals.length; i++) {
        if (new Date(user.goals[i].startDate).getTime() > new Date(mostRecentGoal.startDate).getTime()) {
            mostRecentGoal = user.goals[i];
        }
    }
    return mostRecentGoal;
}

export function getTransactionsAmountByCategoryId(
    user: User | null,
    categoryId: number,
    categoryMap: Record<number, Category>
): number {
    if (!user) return 0;

    const categoryTransactions = getTransactionsArrayCurrentMonth(user).filter(
        (transaction) => categoryMap[categoryId] === transaction.category
    );

    return categoryTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}

export function getTransactionsArrayCurrentMonth(user: User | null): Transaction[] {
    if (!user) return [];

    const now = new Date();
    const fixedTransactions = user.fixed_expenses.map((expense) => {
        return {
            _id: expense._id,
            userId: expense.userId,
            amount: expense.amount,
            category: 'fixed',
            date: new Date(now.getFullYear(), now.getMonth(), 2).toISOString(),
            description: expense.name,
            createdAt: expense.createdAt,
            updatedAt: expense.updatedAt,
        } as Transaction;
    });

    const allTransactions = fixedTransactions.concat(user.transactions);
    return filterCurrentMonth(allTransactions) as Transaction[];
}

export function getGoalTransactionsArrayCurrentMonth(goalTransactionsAll: GoalTransaction[]): GoalTransaction[] {
    return filterCurrentMonth(goalTransactionsAll) as GoalTransaction[];
}

export const getIncomeArrayCurrentMonth = (user: User | null): Income[] => {
    if (user === null) return [];
    return filterCurrentMonth(user.incomes) as Income[];
};

export const getIncomeAmountCurrentMonth = (user: User | null): number => {
    return getIncomeArrayCurrentMonth(user)
        .reduce((res, curr) => res + curr.amount, 0);
};

export const getBalance = (user: User | null, goalTransactionsCurrent: GoalTransaction[]): number => {
    const spentAmount = getTransactionsAmountCurrentMonth(user) + getGoalTransactionsAmountCurrentMonth(goalTransactionsCurrent);
    return getIncomeAmountCurrentMonth(user) - spentAmount;
};

export function getTransactionsAmountCurrentMonth(user: User | null) {
    return getTransactionsArrayCurrentMonth(user).reduce((res, curr) => res + curr.amount, 0);
}

export function getGoalTransactionsAmountCurrentMonth(goalTransactionsAll: GoalTransaction[]) {
    return getGoalTransactionsArrayCurrentMonth(goalTransactionsAll).reduce((res, curr) => res + curr.amount, 0);
}

