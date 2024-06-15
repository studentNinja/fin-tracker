import { Data } from '../utils/dataUtils';
import { filterCurrentMonth, filterPrevMonth } from "../utils/arrayUtils";
import { GoalTransaction } from "../types/goalTransactionTypes";
import { Category } from "../types/categoryTypes";
import { mockUser } from './mockUserData';

jest.mock('../utils/arrayUtils');

describe('Data', () => {
    let user = mockUser;
    let goalTransactionsCurrent: GoalTransaction[];
    let goalTransactionsAll: GoalTransaction[];
    let categoryMap: Record<number, Category>;

    beforeEach(() => {
        goalTransactionsCurrent = [
            {
                _id: '1',
                userId: '1',
                goalId: '1',
                amount: 500,
                date: '2023-01-01'
            } as GoalTransaction
        ];
        goalTransactionsAll = [
            {
                _id: '1',
                userId: '1',
                goalId: '1',
                amount: 500,
                date: '2023-01-01'
            } as GoalTransaction
        ];
        categoryMap = {
            1: 'food' as Category
        };
    });

    it('should calculate saved amount for current goal', () => {
        const data = new Data(user, goalTransactionsCurrent, goalTransactionsAll);
        const savedAmount = data.getSavedAmountCurrentGoal();
        expect(savedAmount).toBe(500);
    });

    it('should calculate saved amount by current month for goal', () => {
        (filterCurrentMonth as jest.Mock).mockReturnValue(goalTransactionsCurrent);
        const data = new Data(user, goalTransactionsCurrent, goalTransactionsAll);
        const savedAmount = data.getSavedAmountByCurrentMonthForGoal();
        expect(savedAmount).toBe(500);
    });

    it('should calculate saved amount by previous month for goal', () => {
        (filterPrevMonth as jest.Mock).mockReturnValue(goalTransactionsCurrent);
        const data = new Data(user, goalTransactionsCurrent, goalTransactionsAll);
        const savedAmount = data.getSavedAmountByPrevMonthForGoal();
        expect(savedAmount).toBe(500);
    });

    it('should get the most recent goal', () => {
        const data = new Data(user, goalTransactionsCurrent, goalTransactionsAll);
        const recentGoal = data.getRecentGoal();
        expect(recentGoal?._id).toBe('2');
    });

    it('should calculate transactions amount by category id', () => {
        (filterCurrentMonth as jest.Mock).mockReturnValue(user.transactions);
        const data = new Data(user, goalTransactionsCurrent, goalTransactionsAll);
        const amount = data.getTransactionsAmountByCategoryId(1, categoryMap);
        expect(amount).toBe(100);
    });

    it('should get transactions array for current month', () => {
        (filterCurrentMonth as jest.Mock).mockReturnValue(user.transactions);
        const data = new Data(user, goalTransactionsCurrent, goalTransactionsAll);
        const transactions = data.getTransactionsArrayCurrentMonth();
        expect(transactions).toEqual(user.transactions);
    });

    it('should get goal transactions array for current month', () => {
        (filterCurrentMonth as jest.Mock).mockReturnValue(goalTransactionsAll);
        const data = new Data(user, goalTransactionsCurrent, goalTransactionsAll);
        const goalTransactions = data.getGoalTransactionsArrayCurrentMonth();
        expect(goalTransactions).toEqual(goalTransactionsAll);
    });

    it('should get income array for current month', () => {
        (filterCurrentMonth as jest.Mock).mockReturnValue(user.incomes);
        const data = new Data(user, goalTransactionsCurrent, goalTransactionsAll);
        const incomes = data.getIncomeArrayCurrentMonth();
        expect(incomes).toEqual(user.incomes);
    });

    it('should calculate income amount for current month', () => {
        (filterCurrentMonth as jest.Mock).mockReturnValue(user.incomes);
        const data = new Data(user, goalTransactionsCurrent, goalTransactionsAll);
        const amount = data.getIncomeAmountCurrentMonth();
        expect(amount).toBe(1700);
    });

    it('should calculate transactions amount for current month', () => {
        (filterCurrentMonth as jest.Mock).mockReturnValue(user.transactions);
        const data = new Data(user, goalTransactionsCurrent, goalTransactionsAll);
        const amount = data.getTransactionsAmountCurrentMonth();
        expect(amount).toBe(600);
    });

    it('should calculate goal transactions amount for current month', () => {
        const currentMonthGoalTransactions = [
            {
                _id: '1',
                userId: '1',
                goalId: '1',
                amount: 500,
                date: '2023-01-01'
            } as GoalTransaction
        ];
        (filterCurrentMonth as jest.Mock).mockReturnValue(currentMonthGoalTransactions);

        const data = new Data(user, goalTransactionsCurrent, goalTransactionsAll);
        const amount = data.getGoalTransactionsAmountCurrentMonth();
        expect(amount).toBe(500);
    });
});
