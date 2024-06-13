import { RootState } from "../app/store";
import {getMonthAndYearFromDate} from "../utils/dateUtils"
import {filterCurrentMonth, filterPrevMonth} from "../utils/arrayUtils";

export class Data{
    state: RootState;


    constructor(state: RootState) {
        this.state = state;
    }
    getAllGoalTransactionsArray(){
        return this.state.goalTransactions.goalTransactionsAll
    }
    getCurrenGoalTransactionsArray(){
        return this.state.goalTransactions.goalTransactionsCurrent
    }

    getSavedAmount() {
        let savedAmount = this.state.goalTransactions.goalTransactionsCurrent
        .reduce((res, curr) => res + curr.amount, 0)
        return savedAmount
    }


    getSavedAmountByCurrentMonth() {
        return filterCurrentMonth(this.state.goalTransactions.goalTransactionsCurrent)
            .reduce((res, curr) => res + curr.amount, 0)
    }
    getSavedAmountByPrevMonth() {
        return filterPrevMonth(this.state.goalTransactions.goalTransactionsCurrent).reduce((res, curr) => res + curr.amount, 0)
    }

    getGoalAmount(){
        let goal= this.state.goals.goals.filter(goal=>!goal.achieved)[0]
        return goal?goal.amount:0
    }


    getTransactionsArray(){
        return filterCurrentMonth(this.state.transactions.transactions)
    }

    getIncomeArray(){
        return filterCurrentMonth(this.state.incomes.incomes)
    }

    getIncomeAmount(){
        return this.getIncomeArray()
            .reduce((res, curr) => res + curr.amount, 0)
    }
    getTransactionsAmount(){
        return this.getTransactionsArray()
            .reduce((res, curr) => res + curr.amount, 0)
    }


}
















