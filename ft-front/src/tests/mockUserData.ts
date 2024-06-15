import { User } from "../types/userTypes";
import { Transaction } from "../types/transactionTypes";
import { FixedExpense } from "../types/fixedExpenseTypes";
import { Goal } from "../types/goalTypes";
import { Income } from "../types/incomeTypes";
import { GoalTransaction } from "../types/goalTransactionTypes";
import { Category } from "../types/categoryTypes";

const currentMonth = new Date().getUTCMonth();
const currentYear = new Date().getUTCFullYear();
const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

export const mockUser: User = {
    _id: '1',
    username: 'Test User',
    email: 'testuser@example.com',
    initial_capital: 5000,
    saving_goal: 10000,
    registration_date: '2022-01-01',
    transactions: [
        {
            _id: '1',
            userId: '1',
            amount: 100,
            category: 'food' as Category,
            date: new Date(currentYear, currentMonth, 1).toISOString(),
            createdAt: new Date(currentYear, currentMonth, 1).toISOString(),
            updatedAt: new Date(currentYear, currentMonth, 1).toISOString(),
            description: 'Lunch'
        } as Transaction,
        {
            _id: '2',
            userId: '1',
            amount: 200,
            category: 'transport' as Category,
            date: new Date(currentYear, previousMonth, 1).toISOString(),
            createdAt: new Date(currentYear, previousMonth, 1).toISOString(),
            updatedAt: new Date(currentYear, previousMonth, 1).toISOString(),
            description: 'Bus'
        },
        {
            _id: '3',
            userId: '1',
            amount: 400,
            category: 'entertainment' as Category,
            date: new Date(currentYear, currentMonth, 15).toISOString(),
            createdAt: new Date(currentYear, currentMonth, 15).toISOString(),
            updatedAt: new Date(currentYear, currentMonth, 15).toISOString(),
            description: 'Movie'
        } as Transaction
    ],
    fixed_expenses: [
        {
            _id: '1',
            name: 'Rent',
            amount: 500,
            userId: '1',
            category: 'fixed' as Category,
            createdAt: '2023-01-01',
            updatedAt: '2023-01-01'
        } as FixedExpense
    ],
    goals: [
        {
            _id: '1',
            userId: '1',
            name: 'Goal 1',
            amount: 1000,
            achieved: false,
            startDate: '2022-01-01',
            createdAt: '2022-01-01',
            updatedAt: '2022-01-01'
        } as Goal,
        {
            _id: '2',
            userId: '1',
            name: 'Goal 2',
            amount: 2000,
            achieved: false,
            startDate: '2023-01-01',
            createdAt: '2023-01-01',
            updatedAt: '2023-01-01'
        } as Goal
    ],
    incomes: [
        {
            _id: '1',
            userId: '1',
            source: 'Salary',
            amount: 1000,
            date: new Date(currentYear, currentMonth, 1).toISOString(),
            createdAt: new Date(currentYear, currentMonth, 1).toISOString(),
            updatedAt: new Date(currentYear, currentMonth, 1).toISOString(),
        } as Income,
        {
            _id: '2',
            userId: '1',
            source: 'Freelance',
            amount: 500,
            date: new Date(currentYear, previousMonth, 1).toISOString(),
            createdAt: new Date(currentYear, previousMonth, 1).toISOString(),
            updatedAt: new Date(currentYear, previousMonth, 1).toISOString()
        } as Income,
        {
            _id: '3',
            userId: '1',
            source: 'Investment',
            amount: 200,
            date: new Date(currentYear, currentMonth, 15).toISOString(),
            createdAt: new Date(currentYear, currentMonth, 15).toISOString(),
            updatedAt: new Date(currentYear, currentMonth, 15).toISOString()
        } as Income
    ]
};

export const mockGoalTransactions: GoalTransaction[] = [
    {
        _id: '1',
        goalId: '1',
        userId: '1',
        amount: 150,
        date: new Date(currentYear, currentMonth, 10).toISOString(),
        createdAt: new Date(currentYear, currentMonth, 10).toISOString(),
        updatedAt: new Date(currentYear, currentMonth, 10).toISOString()
    } as GoalTransaction,
    {
        _id: '2',
        goalId: '2',
        userId: '1',
        amount: 250,
        date: new Date(currentYear, previousMonth, 5).toISOString(),
        createdAt: new Date(currentYear, previousMonth, 5).toISOString(),
        updatedAt: new Date(currentYear, previousMonth, 5).toISOString()
    } as GoalTransaction
];
