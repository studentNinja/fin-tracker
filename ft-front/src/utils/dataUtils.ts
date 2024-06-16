import { GoalTransaction } from "../types/goalTransactionTypes";
import { Goal } from "../types/goalTypes";
import { Transaction } from "../types/transactionTypes";
import { Category } from "../types/categoryTypes";
import { filterCurrentMonth, filterPrevMonth } from "./arrayUtils";
import { Income } from "../types/incomeTypes";
import { FixedExpense } from "../types/fixedExpenseTypes";
import fixedExpensesSlice from "../features/fixedExpenses/fixedExpensesSlice";
import FixedExpensesSlice from "../features/fixedExpenses/fixedExpensesSlice";

function isTransaction(item: any): item is Transaction {
    return (item as Transaction).category !== undefined;
}

function isGoalTransaction(item: any): item is GoalTransaction {
    return (item as GoalTransaction).goalId !== undefined;
}

function isIncome(item: any): item is Income {
    return (item as Income).source !== undefined;
}

export function getSavedAmountCurrentGoal(goalTransactionsCurrent: GoalTransaction[]) {
    return goalTransactionsCurrent.reduce((res, curr) => res + curr.amount, 0);
}

export function getSavedAmountByCurrentMonthForGoal(goalTransactionsCurrent: GoalTransaction[]) {
    return filterCurrentMonth(goalTransactionsCurrent).reduce((res, curr) => res + curr.amount, 0);
}

export function getSavedAmountByPrevMonthForGoal(goalTransactionsCurrent: GoalTransaction[]) {
    return filterPrevMonth(goalTransactionsCurrent).reduce((res, curr) => res + curr.amount, 0);
}

export function getRecentGoal(goals: Goal[]): Goal | null {
    if (!goals || goals.length === 0) return null;

    let mostRecentGoal = goals[0];
    for (let i = 1; i < goals.length; i++) {
        if (new Date(goals[i].startDate).getTime() > new Date(mostRecentGoal.startDate).getTime()) {
            mostRecentGoal = goals[i];
        }
    }
    return mostRecentGoal;
}

export function getTransactionsAmountByCategoryId(
    categoryId: number,
    categoryMap: Record<number, Category>,
    transactions: (Transaction | GoalTransaction | Income)[],
    fixedExpenses: FixedExpense[]
): number {
    if (!transactions) return 0;

    // const categoryTransactions = filterCurrentMonth(transactions.filter(isTransaction))
    const categoryTransactions = getTransactionsArrayCurrentMonth(transactions,fixedExpenses)
        .filter((transaction) => transaction.category === categoryMap[categoryId]);

    return categoryTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}

export function getTransactionsArrayCurrentMonth(
    transactions: (Transaction | GoalTransaction | Income)[],
    fixedExpenses: FixedExpense[]
): Transaction[] {
    const now = new Date();
    const fixedTransactions = fixedExpenses.map((expense) => {
        return {
            _id: expense._id,
            userId: expense.userId,
            amount: expense.amount,
            category: expense.category,
            date: new Date(now.getFullYear(), now.getMonth(), 2).toISOString(),
            description: expense.name,
            createdAt: expense.createdAt,
            updatedAt: expense.updatedAt,
        } as Transaction;
    });

    const allTransactions = fixedTransactions.concat(transactions.filter(isTransaction));
    return filterCurrentMonth(allTransactions) as Transaction[];
}

export function getGoalTransactionsArrayCurrentMonth(goalTransactionsAll: (Transaction | GoalTransaction | Income)[]): GoalTransaction[] {
    return filterCurrentMonth(goalTransactionsAll.filter(isGoalTransaction)) as GoalTransaction[];
}

export const getIncomeArrayCurrentMonth = (incomes: (Transaction | GoalTransaction | Income)[]): Income[] => {
    if (!incomes) return [];
    return filterCurrentMonth(incomes.filter(isIncome)) as Income[];
};

export const getIncomeAmountCurrentMonth = (incomes: (Transaction | GoalTransaction | Income)[]): number => {
    return getIncomeArrayCurrentMonth(incomes)
        .reduce((res, curr) => res + curr.amount, 0);
};

export const getBalance = (
    goalTransactionsCurrent: GoalTransaction[],
    transactions: Transaction[],
    fixedExpenses: FixedExpense[],
    incomes: Income[]
): number => {
    const spentAmount = getTransactionsAmountCurrentMonth(transactions, fixedExpenses) +
        getGoalTransactionsAmountCurrentMonth(goalTransactionsCurrent);
    return getIncomeAmountCurrentMonth(incomes) - spentAmount;
};

export function getTransactionsAmountCurrentMonth(
    transactions: (Transaction | GoalTransaction | Income)[],
    fixedExpenses: FixedExpense[]
): number {
    return getTransactionsArrayCurrentMonth(transactions, fixedExpenses).reduce((res, curr) => res + curr.amount, 0);
}

export function getGoalTransactionsAmountCurrentMonth(goalTransactionsAll: (Transaction | GoalTransaction | Income)[]): number {
    return getGoalTransactionsArrayCurrentMonth(goalTransactionsAll).reduce((res, curr) => res + curr.amount, 0);
}