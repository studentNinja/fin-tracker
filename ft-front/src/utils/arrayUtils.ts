import {Transaction} from "../types/transactionTypes";
import {GoalTransaction} from "../types/goalTransactionTypes";
import {Income} from "../types/incomeTypes";
import {getMonthAndYearFromDate} from "./dateUtils";

export function filterCurrentMonth(items: { date: string }[]): { date: string }[] {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    });
}

export function filterbyMonthAndYear(items: { date: string }[], month: number, year: number): { date: string }[] {
    return items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === month && itemDate.getFullYear() === year;
    });
}


export let filterPrevMonth=(array: (Transaction | GoalTransaction | Income)[])=>{
    return array.filter(obj=>{
            let month=getMonthAndYearFromDate(obj.date)[0]
            let year=getMonthAndYearFromDate(obj.date)[1]
            if(month!=(new Date()).getMonth()|| year!=(new Date()).getUTCFullYear())
                return obj
        }
    )
}

