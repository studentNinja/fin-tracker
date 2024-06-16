import {
    getSavedAmountCurrentGoal,
    getSavedAmountByCurrentMonthForGoal,
    getSavedAmountByPrevMonthForGoal,
    getRecentGoal,
    getTransactionsAmountByCategoryId,
    getTransactionsArrayCurrentMonth,
    getGoalTransactionsArrayCurrentMonth,
    getIncomeArrayCurrentMonth,
    getIncomeAmountCurrentMonth,
    getBalance,
    getTransactionsAmountCurrentMonth,
    getGoalTransactionsAmountCurrentMonth
} from '../utils/dataUtils';

import { mockGoalTransactions, mockUser, mockTransactions, mockFixedExpenses, mockIncomes } from "../mockData/mockUserData";
import { Category } from "../types/categoryTypes";
import { Transaction } from '../types/transactionTypes';
import { GoalTransaction } from '../types/goalTransactionTypes';
import { Income } from '../types/incomeTypes';
import { Goal } from '../types/goalTypes';
import { FixedExpense } from "../types/fixedExpenseTypes";

describe('getSavedAmountCurrentGoal', () => {
    it('calculates the saved amount for current goal correctly', () => {
        const savedAmount = getSavedAmountCurrentGoal(mockGoalTransactions);
        expect(savedAmount).toBe(150 + 250);
    });
});

describe('getSavedAmountByCurrentMonthForGoal', () => {
    it('calculates the saved amount by current month for goal correctly', () => {
        const savedAmount = getSavedAmountByCurrentMonthForGoal(mockGoalTransactions);
        expect(savedAmount).toBe(150);
    });
});

describe('getSavedAmountByPrevMonthForGoal', () => {
    it('calculates the saved amount by previous month for goal correctly', () => {
        const savedAmount = getSavedAmountByPrevMonthForGoal(mockGoalTransactions);
        expect(savedAmount).toBe(250);
    });
});

describe('getRecentGoal', () => {
    it('returns the most recent goal for the user', () => {
        const recentGoal = getRecentGoal(mockUser.goals);
        expect(recentGoal?._id).toBe('2');
    });

    it('returns null if goals array is empty or null', () => {
        const recentGoal = getRecentGoal([]);
        expect(recentGoal).toBeNull();

        const recentGoal2 = getRecentGoal(null as unknown as Goal[]);
        expect(recentGoal2).toBeNull();
    });
});

describe('getTransactionsAmountByCategoryId', () => {
    it('calculates the transactions amount by category id correctly', () => {
        const categoryMap = {
            1: 'pets' as Category
        };
        const amount = getTransactionsAmountByCategoryId(1, categoryMap, mockTransactions,mockFixedExpenses);
        expect(amount).toBe(0);
    });

    it('returns 0 if transactions array is empty or null', () => {
        const amount = getTransactionsAmountByCategoryId(1, {}, [],[]);
        expect(amount).toBe(0);

        const amount2 = getTransactionsAmountByCategoryId(1, {}, null as unknown as Transaction[], null as unknown as FixedExpense[]);
        expect(amount2).toBe(0);
    });
});

describe('getTransactionsArrayCurrentMonth', () => {
    it('returns transactions array for current month correctly', () => {
        const transactions = getTransactionsArrayCurrentMonth(mockTransactions, mockFixedExpenses);
        expect(transactions.length).toBe(3);
    });
});

describe('getGoalTransactionsArrayCurrentMonth', () => {
    it('returns goal transactions array for current month correctly', () => {
        const transactions = getGoalTransactionsArrayCurrentMonth(mockGoalTransactions);
        expect(transactions.length).toBe(1);
    });
});

describe('getIncomeArrayCurrentMonth', () => {
    it('returns income array for current month correctly', () => {
        const incomeArray = getIncomeArrayCurrentMonth(mockIncomes);
        expect(incomeArray.length).toBe(2);
    });

    it('returns empty array if incomes is empty or null', () => {
        const incomeArray = getIncomeArrayCurrentMonth([]);
        expect(incomeArray).toEqual([]);

        const incomeArray2 = getIncomeArrayCurrentMonth(null as unknown as Income[]);
        expect(incomeArray2).toEqual([]);
    });
});

describe('getIncomeAmountCurrentMonth', () => {
    it('calculates income amount for current month correctly', () => {
        const incomeAmount = getIncomeAmountCurrentMonth(mockIncomes);
        expect(incomeAmount).toBe(1200);
    });

    it('returns 0 if incomes is empty or null', () => {
        const incomeAmount = getIncomeAmountCurrentMonth([]);
        expect(incomeAmount).toBe(0);

        const incomeAmount2 = getIncomeAmountCurrentMonth(null as unknown as Income[]);
        expect(incomeAmount2).toBe(0);
    });
});

describe('getBalance', () => {
    it('calculates balance correctly', () => {
        const balance = getBalance(mockGoalTransactions, mockTransactions, mockFixedExpenses, mockIncomes);
        expect(balance).toBe(50);
    });
    it('should return 0 if user is null', () => {
        const balance = getBalance([],[],[], []);
        expect(balance).toBe(0);
      });
});

describe('getTransactionsAmountCurrentMonth', () => {
    it('calculates transactions amount for current month correctly', () => {
        const amount = getTransactionsAmountCurrentMonth(mockTransactions, mockFixedExpenses);
        expect(amount).toBe(1000);
    });
});

describe('getGoalTransactionsAmountCurrentMonth', () => {
    it('calculates goal transactions amount for current month correctly', () => {
        const amount = getGoalTransactionsAmountCurrentMonth(mockGoalTransactions);
        expect(amount).toBe(150);
    });
});
