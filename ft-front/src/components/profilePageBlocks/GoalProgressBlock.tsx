import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import {
  getRecentGoal,
  getSavedAmountCurrentGoal,
} from "../../utils/dataUtils";
import { fetchUserProfile } from "../../features/user/userThunks";
import {
  addGoalTransaction,
  fetchAllGoalTransactions,
  fetchCurrentGoalTransactions,
} from "../../features/goalTransactions/goalTransactionsThunks";
import {
  validateChangeGoalNumber,
  validateNumberToBePositive,
} from "../../utils/validationUtils";
import {
  addGoal,
  fetchGoals,
  updateGoal,
} from "../../features/goals/goalsThunks";

const GoalProgressBlock = (props: {
  showChangeGoalNumber: (
    title: string,
    changeFunct: (number: number) => void
  ) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCurrentGoalTransactions());
    dispatch(fetchGoals());
    dispatch(fetchAllGoalTransactions());
  }, [dispatch]);
  const goals = useSelector((state: RootState) => state.goals.goals);

  const goalTransactionsCurrent = useSelector(
    (state: RootState) => state.goalTransactions.goalTransactionsCurrent
  );

  // Return goal from the User that is last created
  const lastGoal = getRecentGoal(goals);
  console.log(lastGoal, goals);

  const achieved = lastGoal?.achieved;

  const goalAmount = lastGoal ? lastGoal.amount : 0;

  const goalSavedAmount = achieved
    ? goalAmount
    : getSavedAmountCurrentGoal(goalTransactionsCurrent);

  let goalSavedPercent = Math.round((goalSavedAmount / goalAmount) * 100);
  async function changeGoalNumber(number: number) {
    try {
      validateChangeGoalNumber(goalSavedAmount, number);
      validateNumberToBePositive(number);
      let goalId = lastGoal === null ? "" : lastGoal._id;

      await dispatch(
        updateGoal({
          _id: goalId,
          userId: "",
          name: "Ціль",
          amount: number,
          achieved: goalSavedAmount == number,
          startDate: new Date().toISOString(),
          createdAt: "",
          updatedAt: "",
        })
      );
    } catch (error) {
      console.error("Error changing goal amount:", error);
    }
  }

  async function handleCreateGoal(number: number) {
    try {
      if (lastGoal?.achieved) {
        await dispatch(
          addGoal({
            userId: "",
            name: "Ціль",
            amount: number,
            achieved: false,
            startDate: new Date().toISOString(),
            createdAt: "",
            updatedAt: "",
          })
        );
        await dispatch(fetchCurrentGoalTransactions());
      } else {
        throw new Error(
          "Previous goal is not achieved, cannot create a new one"
        );
      }
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  }

  return (
    <div className="block block-flex-1 block-column-content">
      <div className="block-title">Прогрес цілі</div>
      <div className="months-spendings-diagram" id="months-spendings-diagram">
        <div
          className="pie "
          style={{
            backgroundImage: `conic-gradient(var(--purple-diagram-color) ${goalSavedPercent}%, var(--grey-diagram-color) ${goalSavedPercent}%)`,
          }}
        >
          <div className="pie-hole">{goalSavedPercent}%</div>
        </div>
      </div>
      <div className="font-weight-300">
        <span className="font-size-32">
          {goalSavedAmount.toLocaleString("uk-ua")}
        </span>
        /{goalAmount.toLocaleString("uk-ua")}
      </div>
      {!achieved ? (
        <div
          className="btn btn-pop-up"
          onClick={() =>
            props.showChangeGoalNumber("Змінити суму цілі", changeGoalNumber)
          }
        >
          Змінити суму
        </div>
      ) : (
        <div
          className="btn btn-pop-up"
          style={{ fontSize: "14px" }}
          onClick={() =>
            props.showChangeGoalNumber("Створити нову ціль", handleCreateGoal)
          }
        >
          Створити нову ціль
        </div>
      )}
    </div>
  );
};

export default GoalProgressBlock;
