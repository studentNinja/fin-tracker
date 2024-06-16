import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import UserInfoBlock from "../components/profilePageBlocks/UserInfoBlock";
import MonthStatsBlock from "../components/profilePageBlocks/MonthStatsBlock";
import FixedExpensesBlock from "../components/profilePageBlocks/FixedExpensesBlock";
import ConfirmDeletePopUp from "../components/pop-ups/ConfirmDeletePopUp";
import AddIncomeOrFixedExpensesPopUp from "../components/pop-ups/AddIncomeOrFixedExpensesPopUp";
import GoalProgressBlock from "../components/profilePageBlocks/GoalProgressBlock";
import ChangeNumberPopUp from "../components/pop-ups/ChangeNumberPopUp";
import SpengingHistoryStats from "../components/profilePageBlocks/SpengingHistoryStats";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchUserProfile } from "../features/user/userThunks";
import { Category } from "../types/categoryTypes";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import {
  fetchAllGoalTransactions,
  fetchCurrentGoalTransactions,
} from "../features/goalTransactions/goalTransactionsThunks";
import { fetchIncomes } from "../features/income/incomeThunks";
import { fetchTransactions } from "../features/transactions/transactionThunks";
import ChangePasswordPopUp from "../components/pop-ups/ChangePasswordPopUp";

const ProfilePage = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>();
  useEffect(() => {
    dispatch(fetchAllGoalTransactions());
    dispatch(fetchCurrentGoalTransactions());
    dispatch(fetchIncomes());
    dispatch(fetchTransactions());
  }, [dispatch]);
  const { userInfo, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [titleChangeNumberPopUp, setTitleChangeNumberPopUp] = useState("");

  const [visibilityAddFixedExpensePopUp, setVisibilityAddFixedExpensePopUp] =
    useState(false);
  const [visibilityPopUpConfirmDelete, setVisibilityPopUpConfirmDelete] =
    useState(false);
  const [visibilityChangeNumberPopUp, setVisibilityChangeNumberPopUp] =
    useState(false);
 const [visibilityChangePasswordPopUp, setVisibilityChangePasswordPopUp] =
    useState(false);

  const [functionsHolder, setFunctionsHolder] = useState({
    delete: () => {},
    addFixedExpense: (name: string, amount: number) => {},
    changeGoal: (amount: number) => {},
    changePassword: (currentPassword:string, newPassword:string) => {},
  });

  function showConfirmDeletePopUp(deleteFunct: () => void) {
    setFunctionsHolder(Object.assign(functionsHolder, { delete: deleteFunct }));
    setVisibilityPopUpConfirmDelete(true);
  }
  function showChangePasswordPopUp(changePassFunct: (currentPassword:string, newPassword:string ) => void) {
    setFunctionsHolder(Object.assign(functionsHolder, { changePassword: changePassFunct }));
    setVisibilityChangePasswordPopUp(true);
  }


  function showAddFixedExpensePopUp(
    addFunct: (name: string, amount: number) => void
  ) {
    setFunctionsHolder(
      Object.assign(functionsHolder, { addFixedExpense: addFunct })
    );
    setVisibilityAddFixedExpensePopUp(true);
  }

  function showChangeNumberPopUp(
    title: string,
    changeFunct: (number: number) => void
  ) {
    setTitleChangeNumberPopUp(title);
    setFunctionsHolder(
      Object.assign(functionsHolder, { changeGoal: changeFunct })
    );
    setVisibilityChangeNumberPopUp(true);
  }

  return (
    <div className="dashboard-container profile-page-container shadow">
      {userInfo && (
        <>
          <div className="one-row-block-container">
            <UserInfoBlock
              showConfirmDeletePopUp={showConfirmDeletePopUp}
              showChangePasswordPopUp={showChangePasswordPopUp}
            ></UserInfoBlock>
            <div className="one-row-block-container block-flex-3">
              <MonthStatsBlock></MonthStatsBlock>
              <FixedExpensesBlock
                showConfirmDeletePopUp={showConfirmDeletePopUp}
                showPopUpAddFixedExpense={showAddFixedExpensePopUp}
              ></FixedExpensesBlock>
            </div>
          </div>
          <div className="one-row-block-container one-row-block-container-2">
            <GoalProgressBlock
              showChangeGoalNumber={showChangeNumberPopUp}
            ></GoalProgressBlock>
            <SpengingHistoryStats></SpengingHistoryStats>
          </div>
        </>
      )}

      {visibilityPopUpConfirmDelete && (
        <ConfirmDeletePopUp
          cancel={() => setVisibilityPopUpConfirmDelete(false)}
          confirmDelete={functionsHolder.delete}
        />
      )}
      {visibilityAddFixedExpensePopUp && (
        <AddIncomeOrFixedExpensesPopUp
          title={"Додати постійну витрату"}
          cancel={() => setVisibilityAddFixedExpensePopUp(false)}
          confirmAdd={functionsHolder.addFixedExpense}
        />
      )}
      {visibilityChangeNumberPopUp && (
        <ChangeNumberPopUp
          title={titleChangeNumberPopUp}
          cancel={() => setVisibilityChangeNumberPopUp(false)}
          confirmChange={functionsHolder.changeGoal}
        />
      )}
        {visibilityChangePasswordPopUp && (
        <ChangePasswordPopUp
          cancel={() => setVisibilityChangePasswordPopUp(false)}
          confirmChange={functionsHolder.changePassword}
        />
      )}
    </div>
  );
};

export default ProfilePage;
