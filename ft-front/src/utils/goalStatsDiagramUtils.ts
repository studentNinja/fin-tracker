import {GoalTransaction} from "../types/goalTransactionTypes";
import {filterbyMonthAndYear} from "./arrayUtils";

export function getGoalTransactionsDiagramData(transactions: GoalTransaction[], registerDateIso: string|undefined): {average:number,diagramData: Record<string, number> } //Record<string, GoalTransaction[]>
{
    const today = new Date();
    const maxMonths = 6;

    let currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth()  - maxMonths + 1 , 1);
    const registerDate = (registerDateIso===undefined)?endDate:new Date(registerDateIso)
    registerDate.setDate(1)

    let res: Record<string, number>={}
    let iterDate=currentDate
    console.log( "iterDate")
    let sum=0
    let activeMonthCount=0
    while(iterDate>=endDate){
        let month=iterDate.getMonth()+1
        const formattedMonth = month < 10 ? '0' + month : month;
        if(iterDate.getMonth()>=registerDate.getMonth()&& iterDate.getUTCFullYear()>=registerDate.getUTCFullYear()) {
            let monthGoalTransactions=filterbyMonthAndYear(transactions, iterDate.getMonth(),iterDate.getUTCFullYear()) as GoalTransaction[]
            let amount=monthGoalTransactions.reduce((res, curr) => res + curr.amount, 0)
            res[formattedMonth]=amount
            sum+=amount
            activeMonthCount++
        }else{
            res[formattedMonth]=0
        }
        iterDate.setMonth(iterDate.getMonth() - 1)
    }
    let averageAmount= sum/activeMonthCount
    
    const reversedRes = Object.keys(res).reverse().reduce((acc, key) => {
        acc[key] = res[key];
        return acc;
      }, {} as Record<string, number>);

    return {average:averageAmount, diagramData: reversedRes }


}