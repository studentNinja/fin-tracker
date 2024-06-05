import React, {useState} from 'react';

import MonthsSpendingsDiagramPart from "./block3Parts/MonthsSpendingsDiagramPart";
import CategoriesPart from "./block3Parts/CategoriesPart";
import SpendingsHistoryPart from "./block3Parts/SpendingsHistoryPart";
import ConfirmDeletePopUp from "../pop-ups/ConfirmDeletePopUp";

const DashboardBlock1 = (props: { showConfirmDeletePopUp: (deleteFunct:()=>void)=>void }) => {
    let [arraySpendings, setArraySpendings ] = useState([
        {id:1,date:"02.02",title:"АТБ покупки", number:4500, category:6},
        {id:2,date:"03.02",title:"АТБ покупки", number:2000, category:6},
        {id:3,date:"04.02",title:"Одяг в трц", number:4500, category:2},
        {id:4,date:"05.02",title:"Таксі на вокзал", number:5000, category:7},
        {id:5,date:"06.02",title:"Кафе “Пузата хата”", number:2400, category:3},
        {id:6,date:"07.02",title:"АТБ покупки",number:10000, category:6},
        {id:7,date:"11.02",title:"АТБ покупки", number:10000, category:6},
        {id:8,date:"12.02",title:"АТБ покупки", number:1400, category:6}
    ].reverse())

    let [selectedCategory, setSelectedCategory]= useState(0)
    let [arraySpendingsFiltered, setArraySpendingsFiltered]=useState(arraySpendings.slice())

    function selectCategory(id:number){
        if (selectedCategory===id)
            return
        setSelectedCategory(id)
        if(id==0)
            setArraySpendingsFiltered(arraySpendings)
        else
            setArraySpendingsFiltered(arraySpendings.filter((spending)=>spending.category==id))
    }

    function deleteSpending(id:number){

        props.showConfirmDeletePopUp(()=>{
            setArraySpendings(arraySpendings.filter((spending)=>spending.id!==id))
            setArraySpendingsFiltered(arraySpendingsFiltered.filter((spending)=>spending.id!==id))

            /// to do: DELETE

        })


    }


    return (
        <div className="block block-3">
            <MonthsSpendingsDiagramPart spentNumber={28500} putAwayNumber={10500} income={148000} />
            <div className="line-vertical"></div>
            <CategoriesPart selectCategory={selectCategory}/>
            <div className="line-vertical"></div>
            <SpendingsHistoryPart arraySpendings={arraySpendingsFiltered} deleteSpending={deleteSpending}/>
        </div>

    );
};

export default DashboardBlock1;