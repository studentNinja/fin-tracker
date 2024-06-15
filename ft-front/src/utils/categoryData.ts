import {Category} from "../types/categoryTypes";

export const categoryMap: Record<number, Category> = {
    1: 'fixed',
    2: 'clothes',
    3: 'lifestyle',
    4: 'pets',
    5: 'medicine',
    6: 'food',
    7: 'transport',
    8: 'other'
};
export const categoryNames: Record<Category, string> = {
    'fixed':"Постійні витрати",
    'clothes':"Краса та одяг",
    'lifestyle': "Розваги",
    'pets':"Домашні улюбленці",
    'medicine':"Медицина",
    'food':"Продукти",
    'transport':"Транспорт",
    'other':"Інше",
    'goal':'',
    'income':''
};



export const categoryColors: Record<number, string> = {
    1: 'blue',
    2: 'green',
    3: 'orange',
    4: 'purple',
    5: 'yellow',
    6: 'pink',
    7: 'yellow-green',
    8: 'grey'
};