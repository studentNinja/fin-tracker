import React, {useEffect, useState} from "react";

import {Data} from "../../utils/dataUtils";

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {addIncome, fetchIncomes} from "../../features/income/incomeThunks";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {
  addGoalTransaction,
  fetchAllGoalTransactions,
  fetchCurrentGoalTransactions
} from "../../features/goalTransactions/goalTransactionsThunks";
import {fetchGoals} from "../../features/goals/goalsThunks";
import {fetchUserProfile} from "../../features/user/userThunks";
import {
    validateTransaction,
    validateGoalTransactionWithdraw,
    validateNumberToBePositive
} from "../../utils/validationUtils";

const DashboardBlock2 = (props: {
  showMoveMoneyPopUp: (
    title: string,
    moveFunct: (number: number) => void
  ) => void;
}) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();


    const data = useSelector(
        (state: RootState) =>  new Data(state.user.userInfo,state.goalTransactions.goalTransactionsCurrent, state.goalTransactions.goalTransactionsAll)
    );

    let lastGoal=data.getRecentGoal()
    let achieved=lastGoal?.achieved



  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchCurrentGoalTransactions());
  }, [dispatch]);




  // to do: fetch залишок вільних грошей
  let balance = data.getBalance();

  const goalNumber = lastGoal?lastGoal?.amount:0
  const goalPrevMonthsNumber=data.getSavedAmountByPrevMonthForGoal();
  const goalCurrMonthNumber = data.getSavedAmountByCurrentMonthForGoal()

  let goalLeftNumber = goalNumber - data.getSavedAmountCurrentGoal();
  let goalPrevMonthsPercent = Math.round(
    (goalPrevMonthsNumber / goalNumber) * 100
  );
  let goalCurrMonthPercent = Math.round(
    (goalCurrMonthNumber / goalNumber) * 100
  );
  let goalLeftPercent = 100 - goalPrevMonthsPercent - goalCurrMonthPercent;



    function fundGoal(number: number) {
        try {
            validateNumberToBePositive(number)
            validateTransaction(number,  balance)
            handleAddGoalTransaction(number)
        }catch (err){
            console.error("Error funding goal:", err);
        }
    }
    function withdrawFromGoal(number: number) {
        try {
            validateNumberToBePositive(number)
            validateGoalTransactionWithdraw(number,  goalCurrMonthNumber)

            handleAddGoalTransaction(number*(-1))
        }catch (err){
            console.error("Error funding goal:", err);
        }
    }



  async function handleAddGoalTransaction(number: number) {

    try {
      const result = await dispatch(
          addGoalTransaction({
            amount: number,
            userId: "",
            date: "",
          })
      );
    } catch (error) {
      throw new Error(`Error adding income: ${
          error
      }`);
    }
  }




  return (
     !achieved?
         <div className="block block-2">
          <div className="block-title">Прогрес цілі</div>
          <div className="goal-diagram-container">
            <div
              style={{ width: `${goalPrevMonthsPercent}%` }}
              className="goal-diagram-prev-months"
            >
              <div className="goal-diagram-percent">
                {goalPrevMonthsPercent !== 0 ? goalPrevMonthsPercent + "%" : ""}
              </div>
              <div
                className={`goal-diagram-part blue 
                        ${goalPrevMonthsPercent !== 0 ? "diagram-part-first" : ""} 
                        ${
                          goalLeftPercent === 0 && goalCurrMonthPercent === 0
                            ? "diagram-part-last"
                            : ""
                        }     `}
              ></div>
            </div>
            <div
              style={{ width: `${goalCurrMonthPercent}%` }}
              className="goal-diagram-curr-months"
            >
              <div className="goal-diagram-percent">
                {goalCurrMonthPercent !== 0 ? goalCurrMonthPercent + "%" : ""}
              </div>
              <div
                className={`goal-diagram-part yellow 
                        ${goalPrevMonthsPercent === 0 ? "diagram-part-first" : ""} 
                        ${goalLeftPercent === 0 ? "diagram-part-last" : ""}       `}
              ></div>
            </div>
            <div
              style={{ width: `${goalLeftPercent}%` }}
              className="goal-diagram-left"
            >
              <div className="goal-diagram-percent">
                {goalLeftPercent !== 0 ? goalLeftPercent + "%" : ""}
              </div>
              <div
                className={`goal-diagram-part grey 
                        ${
                          goalPrevMonthsPercent === 0 && goalCurrMonthPercent === 0
                            ? "diagram-part-first"
                            : ""
                        } 
                        ${
                          goalLeftPercent !== 0 ? "diagram-part-last" : ""
                        }                
                        `}
              ></div>
            </div>
          </div>
          <div className="text">
            Вже зібрано{" "}
            {(goalPrevMonthsNumber + goalCurrMonthNumber).toLocaleString("uk-UA")}
          </div>
          <div className="goal-diagram-info-container">
            <div className="goal-diagram-info-left">
              <div className="goal-diagram-info-elem">
                <div className="goal-diagram-info-point yellow"></div>
                Результат за попередні місяці:{" "}
                {goalPrevMonthsNumber.toLocaleString("uk-UA")}
              </div>
              <div className="goal-diagram-info-elem">
                <div className="goal-diagram-info-point blue"></div>
                Відкладено цього місяця:{" "}
                {goalCurrMonthNumber.toLocaleString("uk-UA")}
              </div>
              <div className="goal-diagram-info-elem">
                <div className="goal-diagram-info-point grey"></div>
                Залишилось зібрати {goalLeftNumber.toLocaleString("uk-UA")}
              </div>
            </div>
            <div className="goal-diagram-info-number">
              {goalNumber.toLocaleString("uk-UA")}
            </div>
          </div>
          <div className="goal-buttons-container">
            <div
              className="btn"
              onClick={() =>
                props.showMoveMoneyPopUp("Відкласти кошти",fundGoal)
              }
            >
              Відкласти
            </div>
            <div
              className="btn btn-2"
              onClick={() =>
                props.showMoveMoneyPopUp("Зняти кошти", withdrawFromGoal)
              }
            >
              Зняти
            </div>
          </div>
        </div>
         :
         <div className="block block-2">
             <div className="block-title">Прогрес цілі</div>
             <div className="goal-diagram-container">

                 <div
                     style={{ width: `100%` }}
                     className="goal-diagram-left"
                 >
                     <div className="goal-diagram-percent">
                         100%
                     </div>
                     <div
                         className={`goal-diagram-part orange diagram-part-first diagram-part-last`}
                     ></div>
                 </div>
             </div>
             <div className="text center-div">
                 Ціль досягнута!
             </div>
             <div className="goal-diagram-info-container">

                 <div className="goal-diagram-info-number center-div">
                     {goalNumber.toLocaleString("uk-UA")}
                 </div>
             </div>
             <div className="goal-buttons-container center-div">
                 <div
                     className="btn"
                     //to do: create new goal pop up
                     // onClick={() =>
                     //     props.showMoveMoneyPopUp("Відкласти кошти", handleAddGoalTransaction)
                     // }
                 >
                     Створити нову ціль
                 </div>
             </div>
         </div>





  );
};

export default DashboardBlock2;
