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
import {mockGoalTransactions, mockUser }from "../tests/mockUserData"
import { Category } from "../types/categoryTypes";


describe('getSavedAmountCurrentGoal', () => {
    it('calculates the saved amount for current goal correctly', () => {
        const savedAmount = getSavedAmountCurrentGoal(mockGoalTransactions);
        expect(savedAmount).toBe(150 + 250); // Sum of amounts in mockGoalTransactions
    });
});

describe('getSavedAmountByCurrentMonthForGoal', () => {
    it('calculates the saved amount by current month for goal correctly', () => {
        const savedAmount = getSavedAmountByCurrentMonthForGoal(mockGoalTransactions);
        expect(savedAmount).toBe(150); // Assuming current month transactions sum up to 150
    });
});

describe('getSavedAmountByPrevMonthForGoal', () => {
    it('calculates the saved amount by previous month for goal correctly', () => {
        const savedAmount = getSavedAmountByPrevMonthForGoal(mockGoalTransactions);
        expect(savedAmount).toBe(250); // Assuming previous month transactions sum up to 250
    });
});

describe('getRecentGoal', () => {
    it('returns the most recent goal for the user', () => {
        const recentGoal = getRecentGoal(mockUser);
        expect(recentGoal?._id).toBe('2'); // Assuming 'Goal 2' has a later startDate than 'Goal 1'
    });

    it('returns null if user is null or has no goals', () => {
        const recentGoal = getRecentGoal(null);
        expect(recentGoal).toBeNull();

        const userWithoutGoals = { ...mockUser, goals: [] };
        const recentGoal2 = getRecentGoal(userWithoutGoals);
        expect(recentGoal2).toBeNull();
    });
});

describe('getTransactionsAmountByCategoryId', () => {
    it('calculates the transactions amount by category id correctly', () => {
        const categoryMap = {
            1: 'pets' as Category
        };
        const amount = getTransactionsAmountByCategoryId(mockUser, 1, categoryMap);
        expect(amount).toBe(0);
    });

    it('returns 0 if user is null', () => {
        const amount = getTransactionsAmountByCategoryId(null, 1, {});
        expect(amount).toBe(0);
    });
});

describe('getBalance', () => {
    it('calculates balance correctly', () => {
        const balance = getBalance(mockUser, mockGoalTransactions);
        expect(balance).toBe(-850);
    });
});

describe('getTransactionsAmountCurrentMonth', () => {
    it('calculates transactions amount for current month correctly', () => {
        const amount = getTransactionsAmountCurrentMonth(mockUser);
        expect(amount).toBe(800);
    });

    it('returns 0 if user is null', () => {
        const amount = getTransactionsAmountCurrentMonth(null);
        expect(amount).toBe(0);
    });
});

describe('getGoalTransactionsAmountCurrentMonth', () => {
    it('calculates goal transactions amount for current month correctly', () => {
        const amount = getGoalTransactionsAmountCurrentMonth(mockGoalTransactions);
        expect(amount).toBe(150);
    });
});
