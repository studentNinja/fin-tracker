import {Transaction} from "../types/transactionTypes";
import {GoalTransaction} from "../types/goalTransactionTypes";
import {Income} from "../types/incomeTypes";
import {getMonthAndYearFromDate} from "./dateUtils";
import {Goal} from "../types/goalTypes";

// export let filterCurrentMonth=(array: (Transaction | GoalTransaction | Income)[])=>{
export let filterCurrentMonth=(array: Transaction[] | GoalTransaction[] | Income[])=>{
    return filterbyMonthAndYear(array, (new Date()).getMonth(),(new Date()).getUTCFullYear())
}

export let filterbyMonthAndYear=(array: (Transaction | GoalTransaction | Income)[], month:number, year:number)=>{
    return array.filter(obj=>{
            let objMonth=getMonthAndYearFromDate(obj.date)[0]
            let objYear=getMonthAndYearFromDate(obj.date)[1]
            if(objMonth===month&& objYear===year)
                return obj
        }
    )
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

