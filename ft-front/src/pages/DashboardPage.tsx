import React, {useState} from 'react';
import UserForm from '../components/userForm';
import '../styles/dashboard.css';
import deleteBtn from "../assets/delete-btn.svg"
import DashboardBlock1 from "../components/dashboardPageBlocks/DashboardBlock1";
import DashboardBlock2 from "../components/dashboardPageBlocks/DashboardBlock2";
import DashboardBlock3 from "../components/dashboardPageBlocks/DashboardBlock3";
import ConfirmDeletePopUp from "../components/pop-ups/ConfirmDeletePopUp";




const DashboardPage: React.FC = () => {


    const [showPopUpConfirmDelete, setShowPopUpConfirmDelete] = useState(false)
    const [deleteFunctionHolder, setDeleteFunction] = useState( {delete: ()=>{} })
    console.log(deleteFunctionHolder)
    function showConfirmDeletePopUp(deleteFunct:()=>void){
        console.log(deleteFunct)
        setDeleteFunction({delete:() =>
        {
            deleteFunct()
        }})
        setShowPopUpConfirmDelete(true)
    }



    return (
        <div className="dashboard-container shadow">
            <div className="first-row-block-container">
                <DashboardBlock1 showConfirmDeletePopUp={showConfirmDeletePopUp}/>
                <DashboardBlock2/>
            </div>
            <DashboardBlock3 showConfirmDeletePopUp={showConfirmDeletePopUp}/>

            {showPopUpConfirmDelete?<ConfirmDeletePopUp cancel={setShowPopUpConfirmDelete} confirmDelete={deleteFunctionHolder.delete}/>:""}
        </div>
    );
};

export default DashboardPage;
