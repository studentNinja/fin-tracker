export function filterCurrentMonth<T extends { date: string }>(items: T[]): T[] {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    });
}

export function filterbyMonthAndYear<T extends { date: string }>(items: T[], month: number, year: number): T[] {
    return items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === month && itemDate.getFullYear() === year;
    });
}

export function filterPrevMonth<T extends { date: string }>(items: T[]): T[] {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    return items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === previousMonth && itemDate.getFullYear() === previousYear;
    });
}
