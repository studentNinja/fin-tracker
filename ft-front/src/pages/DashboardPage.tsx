import React, {useState} from 'react';
import UserForm from '../components/userForm';
import '../styles/dashboard.css';
import deleteBtn from "../assets/delete-btn.svg"
import DashboardBlock1 from "../components/dashboardPageBlocks/DashboardBlock1";
import DashboardBlock2 from "../components/dashboardPageBlocks/DashboardBlock2";
import DashboardBlock3 from "../components/dashboardPageBlocks/DashboardBlock3";
import ConfirmDeletePopUp from "../components/pop-ups/ConfirmDeletePopUp";
import AddIncomeOrFixedExpensesPopUp from "../components/pop-ups/AddIncomeOrFixedExpensesPopUp";
import MoveMoneyPopUp from "../components/pop-ups/MoveMoneyPopUp";
import AddSpendingPopUp from "../components/pop-ups/AddSpendingPopUp";




const DashboardPage: React.FC = () => {


    const [visibilityPopUpConfirmDelete, setVisibilityPopUpConfirmDelete] = useState(false)
    const [visibilityPopUpAddIncome, setVisibilityPopUpAddIncome] = useState(false)
    const [visibilityMoveMoneyPopUp, setVisibilityMoveMoneyPopUp] = useState(false)
    const [visibilityAddSpendingPopUp, setVisibilityAddSpendingPopUp] = useState(false)

    const [functionsHolder, setFunctionsHolder] = useState( {
        delete: ()=>{},
        addIncome:(title:string, number:number)=>{} ,
        addSpending:(categoryId:number, title:string, number:number)=>{} ,
        moveMoney:( number:number)=>{} ,
    })

    const [titleMoveMoneyPopUp, setTitleMoveMoneyPopUp] =useState("")

    function showConfirmDeletePopUp(deleteFunct:()=>void){
        setFunctionsHolder(Object.assign(functionsHolder, {delete:deleteFunct}))
        setVisibilityPopUpConfirmDelete(true)
    }

     function showPopUpAddIncome(addFunct:(title:string, number:number)=>void){
        setFunctionsHolder(Object.assign(functionsHolder, {addIncome:addFunct}))
        setVisibilityPopUpAddIncome(true)
    }

    function showMoveMoneyPopUp(title:string, moveFunct:(number:number)=>void ){
        setTitleMoveMoneyPopUp(title)
        setFunctionsHolder(Object.assign(functionsHolder, {moveMoney:moveFunct}))
        setVisibilityMoveMoneyPopUp(true)
    }

    function showAddSpendingPopUp(addFunct:(categoryId:number,title:string, number:number)=>void){
        setFunctionsHolder(Object.assign(functionsHolder, {addSpending:addFunct}))
        setVisibilityAddSpendingPopUp(true)
    }


    return (
        <div className="dashboard-container shadow">
            <div className="first-row-block-container">
                <DashboardBlock1 showConfirmDeletePopUp={showConfirmDeletePopUp}
                                 showPopUpAddIncome={showPopUpAddIncome}  />
                <DashboardBlock2 showMoveMoneyPopUp={showMoveMoneyPopUp} />
            </div>
            <DashboardBlock3 showConfirmDeletePopUp={showConfirmDeletePopUp}
                             showAddSpendingPopUp={showAddSpendingPopUp}

            />

            {visibilityPopUpConfirmDelete?<ConfirmDeletePopUp
                cancel={()=>setVisibilityPopUpConfirmDelete(false)}
                confirmDelete={functionsHolder.delete}
            />:""}
            {visibilityPopUpAddIncome?<AddIncomeOrFixedExpensesPopUp title={"Додати джерело доходу"}
                                                                     cancel={()=>setVisibilityPopUpAddIncome(false)}
                                                                     confirmAdd={functionsHolder.addIncome}
            />:""}
            {visibilityMoveMoneyPopUp?<MoveMoneyPopUp title={titleMoveMoneyPopUp}
                                                      cancel={()=>setVisibilityMoveMoneyPopUp(false)}
                                                      confirmMove={functionsHolder.moveMoney}
            />:""}
            {visibilityAddSpendingPopUp?<AddSpendingPopUp
                                                      cancel={()=>setVisibilityAddSpendingPopUp(false)}
                                                      confirmAdd={functionsHolder.addSpending}
            />:""}



        </div>
    );
};

export default DashboardPage;
