import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import DashboardBlock1 from "../components/dashboardPageBlocks/IncomeBlock";
import DashboardBlock2 from "../components/dashboardPageBlocks/ProgressBlock";
import DashboardBlock3 from "../components/dashboardPageBlocks/StatisticsBlock";
import ConfirmDeletePopUp from "../components/pop-ups/ConfirmDeletePopUp";
import AddIncomeOrFixedExpensesPopUp from "../components/pop-ups/AddIncomeOrFixedExpensesPopUp";
import ChangeNumberPopUp from "../components/pop-ups/ChangeNumberPopUp";
import AddSpendingPopUp from "../components/pop-ups/AddSpendingPopUp";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { fetchUserInfo } from "../features/user/userSlice";

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  console.log(userInfo);

  const [visibilityPopUpConfirmDelete, setVisibilityPopUpConfirmDelete] =
    useState(false);
  const [visibilityPopUpAddIncome, setVisibilityPopUpAddIncome] =
    useState(false);
  const [visibilityMoveMoneyPopUp, setVisibilityMoveMoneyPopUp] =
    useState(false);
  const [visibilityAddSpendingPopUp, setVisibilityAddSpendingPopUp] =
    useState(false);

  const [functionsHolder, setFunctionsHolder] = useState({
    delete: () => {},
    addIncome: (title: string, number: number) => {},
    addSpending: (categoryId: number, title: string, number: number) => {},
    moveMoney: (number: number) => {},
  });

  const [titleMoveMoneyPopUp, setTitleMoveMoneyPopUp] = useState("");

  function showConfirmDeletePopUp(deleteFunct: () => void) {
    setFunctionsHolder(Object.assign(functionsHolder, { delete: deleteFunct }));
    setVisibilityPopUpConfirmDelete(true);
  }

  function showPopUpAddIncome(
    addFunct: (title: string, number: number) => void
  ) {
    setFunctionsHolder(Object.assign(functionsHolder, { addIncome: addFunct }));
    setVisibilityPopUpAddIncome(true);
  }

  function showMoveMoneyPopUp(
    title: string,
    moveFunct: (number: number) => void
  ) {
    setTitleMoveMoneyPopUp(title);
    setFunctionsHolder(
      Object.assign(functionsHolder, { moveMoney: moveFunct })
    );
    setVisibilityMoveMoneyPopUp(true);
  }

  function showAddSpendingPopUp(
    addFunct: (categoryId: number, title: string, number: number) => void
  ) {
    setFunctionsHolder(
      Object.assign(functionsHolder, { addSpending: addFunct })
    );
    setVisibilityAddSpendingPopUp(true);
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
            <DashboardBlock2 showMoveMoneyPopUp={showMoveMoneyPopUp} />
          </div>
          <DashboardBlock3
            showConfirmDeletePopUp={showConfirmDeletePopUp}
            showAddSpendingPopUp={showAddSpendingPopUp}
          />
        </>
      )}

      {visibilityPopUpConfirmDelete ? (
        <ConfirmDeletePopUp
          cancel={() => setVisibilityPopUpConfirmDelete(false)}
          confirmDelete={functionsHolder.delete}
        />
      ) : (
        ""
      )}
      {visibilityPopUpAddIncome ? (
        <AddIncomeOrFixedExpensesPopUp
          title={"Додати джерело доходу"}
          cancel={() => setVisibilityPopUpAddIncome(false)}
          confirmAdd={functionsHolder.addIncome}
        />
      ) : (
        ""
      )}
      {visibilityMoveMoneyPopUp ? (
        <ChangeNumberPopUp
          title={titleMoveMoneyPopUp}
          cancel={() => setVisibilityMoveMoneyPopUp(false)}
          confirmChange={functionsHolder.moveMoney}
        />
      ) : (
        ""
      )}
      {visibilityAddSpendingPopUp ? (
        <AddSpendingPopUp
          cancel={() => setVisibilityAddSpendingPopUp(false)}
          confirmAdd={functionsHolder.addSpending}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default DashboardPage;
