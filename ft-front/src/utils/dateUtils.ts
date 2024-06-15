export let formatDate=(isoString:string | undefined)=>{
    if(!isoString)
        return ""
    const date = new Date(isoString);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    return `${formattedDay}.${formattedMonth}.${year}`;
}

export let formatDateAndMonth=(isoString:string | undefined) =>{
    if(!isoString)
        return ""
    const date = new Date(isoString);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;

    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    return `${formattedDay}.${formattedMonth}`;
}


export let getMonthAndYearFromDate=(isoString:string | undefined)=>{
    if(!isoString)
        return ""
    const date = new Date(isoString);

    return [date.getMonth(), date.getFullYear()];

}