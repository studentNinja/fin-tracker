import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import {
  addGoalTransaction,
  fetchCurrentGoalTransactions,
} from "../../features/goalTransactions/goalTransactionsThunks";
import { fetchUserProfile } from "../../features/user/userThunks";
import {
  validateTransaction,
  validateGoalTransactionWithdraw,
  validateNumberToBePositive,
} from "../../utils/validationUtils";
import {
  getRecentGoal,
  getBalance,
  getSavedAmountByPrevMonthForGoal,
  getSavedAmountByCurrentMonthForGoal,
  getSavedAmountCurrentGoal,
} from "../../utils/dataUtils";
import { Transaction } from "../../types/transactionTypes";
import { FixedExpense } from "../../types/fixedExpenseTypes";
import { Income } from "../../types/incomeTypes";
import {addGoal, fetchGoals} from "../../features/goals/goalsThunks";
import {set} from "react-hook-form";

interface Props {
  showMoveMoneyPopUp: (
    title: string,
    moveFunct: (number: number) => void
  ) => void;
  showCreateGoalPopUp: (createFunct: (number: number) => void) => void;
}
const DashboardBlock2: React.FC<Props> = (props) => {
  const dispatch = useDispatch<AppDispatch>();


  const user = useSelector((state: RootState) => state.user.userInfo);

  const goalTransactionsCurrent = useSelector(
    (state: RootState) => state.goalTransactions.goalTransactionsCurrent
  );
  const goalTransactionsAll = useSelector(
    (state: RootState) => state.goalTransactions.goalTransactionsAll
  );
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const goals = useSelector((state: RootState) => state.goals.goals);
  const fixedExpenses = useSelector(
    (state: RootState) => state.fixedExpenses.fixedExpenses
  );
  const incomes = useSelector((state: RootState) => state.incomes.incomes);
  let lastGoal = getRecentGoal(goals || []);
  let [achieved,setAchieved] = useState(lastGoal?.achieved || false)



  useEffect(() => {
    dispatch(fetchCurrentGoalTransactions());
    dispatch(fetchGoals());
  }, [dispatch]);
   useEffect(() => {
      setAchieved(lastGoal?.achieved || false)
    }, [lastGoal]);


  const balance = getBalance(
    goalTransactionsAll,
    transactions,
    fixedExpenses,
    incomes
  );

  const goalNumber = lastGoal ? lastGoal.amount : 0;
  const goalPrevMonthsNumber =
    getSavedAmountByPrevMonthForGoal(goalTransactionsCurrent);
  const goalCurrMonthNumber = getSavedAmountByCurrentMonthForGoal(
    goalTransactionsCurrent
  );
  const goalLeftNumber =
    goalNumber - getSavedAmountCurrentGoal(goalTransactionsCurrent);

  const goalPrevMonthsPercent = Math.round(
    (goalPrevMonthsNumber / goalNumber) * 100
  );
  const goalCurrMonthPercent = Math.round(
    (goalCurrMonthNumber / goalNumber) * 100
  );
  const goalLeftPercent = 100 - goalPrevMonthsPercent - goalCurrMonthPercent;

  function fundGoal(number: number) {
    try {
      validateNumberToBePositive(number);
      validateTransaction(number, balance);
      handleAddGoalTransaction(number);
    } catch (err) {
      console.error("Error funding goal:", err);
    }
  }

  async function handleAddGoalTransaction(number: number) {
    try {
      if (!lastGoal) {
        throw new Error("No goal found.");
      }
      if(number>=goalLeftNumber)
        setAchieved(true)
      await dispatch(
        addGoalTransaction({
          amount: number,
          userId: user?._id || "",
          date: new Date().toISOString(),
          category: "goal",
        })
      );
    } catch (error) {
      console.error("Error adding goal transaction:", error);
    }
  }

  function withdrawFromGoal(number: number) {
    try {
      validateNumberToBePositive(number);
      validateGoalTransactionWithdraw(number, goalCurrMonthNumber);
      handleAddGoalTransaction(number * -1);
    } catch (err) {
      console.error("Error withdrawing from goal:", err);
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
        // setAchieved(false)
      } else {
        throw new Error(
          "Previous goal is not achieved, cannot create a new one"
        );
      }
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  }

  return !achieved ? (
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
            className={`goal-diagram-part  yellow ${
              goalPrevMonthsPercent !== 0 ? "diagram-part-first" : ""
            } ${
              goalLeftPercent === 0 && goalCurrMonthPercent === 0
                ? "diagram-part-last"
                : ""
            }`}
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
            className={`goal-diagram-part blue ${
              goalPrevMonthsPercent === 0 ? "diagram-part-first" : ""
            } ${goalLeftPercent === 0 ? "diagram-part-last" : ""}`}
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
            className={`goal-diagram-part grey ${
              goalPrevMonthsPercent === 0 && goalCurrMonthPercent === 0
                ? "diagram-part-first"
                : ""
            } ${goalLeftPercent !== 0 ? "diagram-part-last" : ""}`}
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
          onClick={() => props.showMoveMoneyPopUp("Відкласти кошти", fundGoal)}
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
  ) : (
    <div className="block block-2">
      <div className="block-title">Прогрес цілі</div>
      <div className="goal-diagram-container">
        <div style={{ width: `100%` }} className="goal-diagram-left">
          <div className="goal-diagram-percent">100%</div>
          <div
            className={`goal-diagram-part orange diagram-part-first diagram-part-last`}
          ></div>
        </div>
      </div>
      <div className="text center-div">Ціль досягнута!</div>
      <div className="goal-diagram-info-container">
        <div className="goal-diagram-info-number center-div">
          {goalNumber.toLocaleString("uk-UA")}
        </div>
      </div>
      <div className="goal-buttons-container center-div">
        <div
          className="btn"
          //  create new goal pop up
          onClick={() => props.showCreateGoalPopUp(handleCreateGoal)}
        >
          Створити нову ціль
        </div>
      </div>
    </div>
  );
};

export default DashboardBlock2;
