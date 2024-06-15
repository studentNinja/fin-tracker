import { filterCurrentMonth, filterbyMonthAndYear, filterPrevMonth } from '../utils/arrayUtils';
import { Transaction } from '../types/transactionTypes';
import { GoalTransaction } from '../types/goalTransactionTypes';
import { Income } from '../types/incomeTypes';
import { mockUser, mockGoalTransactions } from '../tests/mockUserData';

// Mock data
const transactions: Transaction[] = mockUser.transactions as Transaction[];
const goalTransactions: GoalTransaction[] = mockGoalTransactions;
const incomes: Income[] = mockUser.incomes as Income[];

describe('filterCurrentMonth', () => {
    test('should filter transactions for the current month', () => {
        const filtered = filterCurrentMonth(transactions);
        expect(filtered.length).toBe(2);
    });

    test('should filter goal transactions for the current month', () => {
        const filtered = filterCurrentMonth(goalTransactions);
        expect(filtered.length).toBe(1);
    });

    test('should filter incomes for the current month', () => {
        const filtered = filterCurrentMonth(incomes);
        expect(filtered.length).toBe(2);
    });
});

describe('filterbyMonthAndYear', () => {
    const currentMonth = new Date().getUTCMonth();
    const currentYear = new Date().getUTCFullYear();

    test('should filter transactions by specified month and year', () => {
        const filtered = filterbyMonthAndYear(transactions, currentMonth, currentYear);
        expect(filtered.length).toBe(2);
    });

    test('should filter goal transactions by specified month and year', () => {
        const filtered = filterbyMonthAndYear(goalTransactions, currentMonth, currentYear);
        expect(filtered.length).toBe(1);
    });

    test('should filter incomes by specified month and year', () => {
        const filtered = filterbyMonthAndYear(incomes, currentMonth, currentYear);
        expect(filtered.length).toBe(2);
    });
});

describe('filterPrevMonth', () => {
    test('should filter transactions for the previous month', () => {
        const filtered = filterPrevMonth(transactions);
        expect(filtered.length).toBe(1);
    });

    test('should filter goal transactions for the previous month', () => {
        const filtered = filterPrevMonth(goalTransactions);
        expect(filtered.length).toBe(1);
    });

    test('should filter incomes for the previous month', () => {
        const filtered = filterPrevMonth(incomes);
        expect(filtered.length).toBe(1);
    });
});
