import React, { useState } from "react";
import "../styles/dashboard.css";
import DashboardBlock1 from "../components/dashboardPageBlocks/IncomeBlock";
import DashboardBlock2 from "../components/dashboardPageBlocks/ProgressBlock";
import DashboardBlock3 from "../components/dashboardPageBlocks/StatisticsBlock";
import ConfirmDeletePopUp from "../components/pop-ups/ConfirmDeletePopUp";
import AddIncomeOrFixedExpensesPopUp from "../components/pop-ups/AddIncomeOrFixedExpensesPopUp";
import ChangeNumberPopUp from "../components/pop-ups/ChangeNumberPopUp";
import AddSpendingPopUp from "../components/pop-ups/AddSpendingPopUp";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const DashboardPage: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { incomes } = useSelector((state: RootState) => state.incomes);

  const [visibilityAddFixedExpensePopUp, setVisibilityAddFixedExpensePopUp] =
    useState(false);
  const [visibilityPopUpConfirmDelete, setVisibilityPopUpConfirmDelete] =
    useState(false);
  const [visibilityPopUpAddIncome, setVisibilityPopUpAddIncome] =
    useState(false);
  const [visibilityMoveMoneyPopUp, setVisibilityMoveMoneyPopUp] =
    useState(false);
  const [visibilityAddSpendingPopUp, setVisibilityAddSpendingPopUp] =
    useState(false);
 const [visibilityCreateGoalPopUp, setVisibilityCreateGoalPopUp] =
    useState(false);

  const [functionsHolder, setFunctionsHolder] = useState({
    delete: () => {},
    addIncome: (title: string, number: number) => {},
    addSpending: (categoryId: number, title: string, number: number) => {},
    addFixedExpense: (title: string, number: number) => {},
    moveMoney: (number: number) => {},
    createGoal: (number: number) => {},
  });

  const [titleMoveMoneyPopUp, setTitleMoveMoneyPopUp] = useState("");

  function showConfirmDeletePopUp(deleteFunct: () => void) {
    setFunctionsHolder((prev) => ({ ...prev, delete: deleteFunct }));
    setVisibilityPopUpConfirmDelete(true);
  }

  function showPopUpAddIncome(
    addFunct: (title: string, number: number) => void
  ) {
    setFunctionsHolder((prev) => ({ ...prev, addIncome: addFunct }));
    setVisibilityPopUpAddIncome(true);
  }

  function showMoveMoneyPopUp(
    title: string,
    moveFunct: (number: number) => void
  ) {
    setTitleMoveMoneyPopUp(title);
    setFunctionsHolder((prev) => ({ ...prev, moveMoney: moveFunct }));
    setVisibilityMoveMoneyPopUp(true);
  }

  function showAddSpendingPopUp(
    addFunct: (categoryId: number, title: string, number: number) => void
  ) {
    setFunctionsHolder((prev) => ({ ...prev, addSpending: addFunct }));
    setVisibilityAddSpendingPopUp(true);
  }
  function showCreateGoalPopUp(
      createFunct: (number: number) => void)
  {
    setFunctionsHolder(
        Object.assign(functionsHolder, { createGoal: createFunct })
    );
    setVisibilityCreateGoalPopUp(true);
  }

  return (
    <div className="dashboard-container shadow">
      {userInfo && (
        <>
          <div className="one-row-block-container">
            <DashboardBlock1
              showConfirmDeletePopUp={showConfirmDeletePopUp}
              showPopUpAddIncome={showPopUpAddIncome}
            />
            <DashboardBlock2
                showMoveMoneyPopUp={showMoveMoneyPopUp}
                showCreateGoalPopUp={showCreateGoalPopUp}
            />
          </div>
          <DashboardBlock3
            showConfirmDeletePopUp={showConfirmDeletePopUp}
            showAddSpendingPopUp={showAddSpendingPopUp}
          />
        </>
      )}

      {visibilityPopUpConfirmDelete && (
        <ConfirmDeletePopUp
          cancel={() => setVisibilityPopUpConfirmDelete(false)}
          confirmDelete={functionsHolder.delete}
        />
      )}
      {visibilityPopUpAddIncome && (
        <AddIncomeOrFixedExpensesPopUp
          title={"Додати джерело доходу"}
          cancel={() => setVisibilityPopUpAddIncome(false)}
          confirmAdd={functionsHolder.addIncome}
        />
      )}
      {visibilityMoveMoneyPopUp && (
        <ChangeNumberPopUp
          title={titleMoveMoneyPopUp}
          cancel={() => setVisibilityMoveMoneyPopUp(false)}
          confirmChange={functionsHolder.moveMoney}
        />
      )}
      {visibilityAddSpendingPopUp && (
        <AddSpendingPopUp
          cancel={() => setVisibilityAddSpendingPopUp(false)}
          confirmAdd={functionsHolder.addSpending}
        />
      )}
      {visibilityCreateGoalPopUp && (
          <ChangeNumberPopUp
              title="Створити нову ціль"
              cancel={() => setVisibilityCreateGoalPopUp(false)}
              confirmChange={functionsHolder.createGoal}
          />
      )}
    </div>
  );
};

export default DashboardPage;
