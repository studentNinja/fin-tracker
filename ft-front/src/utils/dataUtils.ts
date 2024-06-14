import {filterCurrentMonth, filterPrevMonth} from "./arrayUtils";
import {User} from "../types/userTypes";
import {GoalTransaction} from "../types/goalTransactionTypes";
import {Goal} from "../types/goalTypes";
import {Transaction} from "../types/transactionTypes";
import {Category} from "../types/categoryTypes";
import {compose} from "@reduxjs/toolkit";


export class Data{
    private user: User | null ;
    private goalTransactionsAll: GoalTransaction[];
    private goalTransactionsCurrent: GoalTransaction[];


    constructor(user: User | null, goalTransactionsCurrent:GoalTransaction[]=[], goalTransactionsAll:GoalTransaction[]=[]) {
        console.log(user);
        this.user = user;
        this.goalTransactionsAll = goalTransactionsAll;
        this.goalTransactionsCurrent = goalTransactionsCurrent;
    }



    getSavedAmountCurrentGoal() {
        let savedAmount = this.goalTransactionsCurrent
            .reduce((res, curr) => res + curr.amount, 0)
        return savedAmount
    }


    getSavedAmountByCurrentMonthForGoal() {
        return filterCurrentMonth(this.goalTransactionsCurrent)
            .reduce((res, curr) => res + curr.amount, 0)
    }
    getSavedAmountByPrevMonthForGoal() {
        return filterPrevMonth(this.goalTransactionsCurrent).reduce((res, curr) => res + curr.amount, 0)
    }



    getRecentGoal(): Goal | null {
        if(this.user==null)
            return null
        if (this.user.goals.length === 0) {
            return null;
        }
        let goals=this.user.goals

        let mostRecentGoal = goals[0];

        for (let i = 1; i < goals.length; i++) {
            if (new Date(goals[i].startDate).getTime() >(new Date(mostRecentGoal.startDate)).getTime()) {
                mostRecentGoal = goals[i];
            }
        }
        return mostRecentGoal;
    }

    getTransactionsAmountByCategoryId(categoryId: number, categoryMap:Record<number, Category>){
        if(this.user==null)
            return 0
        let categoryTransactions= this.getTransactionsArrayCurrentMonth()
            .filter(transaction => categoryMap[categoryId] === transaction.category)

        return  categoryTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    }

    getTransactionsArrayCurrentMonth(){
        if(this.user==null)
            return []
        const now = new Date();
        let fixedTransactions=this.user.fixed_expenses.map(expense=> {
            return {
                _id: expense._id,
                userId: expense.userId,
                amount: expense.amount,
                category: 'fixed',
                date: new Date(now.getFullYear(), now.getMonth(), 2).toISOString(),
                description: expense.name,
                createdAt: expense.createdAt,
                updatedAt: expense.updatedAt
            } as Transaction
        })
        let allTransactions=fixedTransactions.concat(this.user.transactions)

        return filterCurrentMonth(allTransactions) as Transaction[]
    }
    getGoalTransactionsArrayCurrentMonth(){
        if(this.user==null)
            return []

        return filterCurrentMonth(this.goalTransactionsAll) as GoalTransaction[]
    }


    getIncomeArrayCurrentMonth(){
        if(this.user==null)
            return []
        return filterCurrentMonth(this.user.incomes)
    }

    getIncomeAmountCurrentMonth(){
        return this.getIncomeArrayCurrentMonth()
            .reduce((res, curr) => res + curr.amount, 0)
    }
    getTransactionsAmountCurrentMonth(){
        return this.getTransactionsArrayCurrentMonth()
            .reduce((res, curr) => res + curr.amount, 0)
    }
    getGoalTransactionsAmountCurrentMonth(){
        return this.getGoalTransactionsArrayCurrentMonth()
            .reduce((res, curr) => res + curr.amount, 0)
    }


    getBalance(){
        let spentAmount=this.getTransactionsAmountCurrentMonth()+this.getGoalTransactionsAmountCurrentMonth()
        return this.getIncomeAmountCurrentMonth()-spentAmount
    }

}












