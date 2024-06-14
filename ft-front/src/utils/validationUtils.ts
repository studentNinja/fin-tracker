export let validateTitle=(title:string)=>{
    if( title.length>=60)
        throw new Error("Занадто довга назва")
    if(title.length==0 )
        throw new Error("Поле з назвою не може бути порожнє")
}
export let validateIncomeDelete=(deleteAmount:number, balance:number)=>{
    if( deleteAmount>balance)
        throw new Error("Ви не можете видалити це джерело доходу, оскільки баланс стане від'ємним")
}
export let validateTransaction=(amount:number, balance:number)=>{
    if(amount>balance)
        throw new Error("Недостатньо коштів для здійснення операції")
}
export let validateGoalTransactionWithdraw=(withdrawAmount:number, goalCurrentMonthBalance:number)=>{
    if(withdrawAmount>goalCurrentMonthBalance)
        throw new Error("Ви не можете зняти більше, аніж відклали цього місяця")
}

export let validateNumberToBePositive=(number:number)=>{
    if (number <= 0)
        throw new Error("Значення має бути додатнім");
}


