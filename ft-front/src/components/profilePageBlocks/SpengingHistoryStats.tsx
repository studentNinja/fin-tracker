import React, { useMemo } from "react";
import BarChart from "./BarChart";
import { getGoalTransactionsDiagramData } from "../../utils/goalStatsDiagramUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const SpendingHistoryStats = () => {
  const goalTransactionsCurrent = useSelector(
    (state: RootState) => state.goalTransactions.goalTransactionsCurrent
  );
  const registerDate = useSelector(
    (state: RootState) => state.user.userInfo?.registration_date
  );
  const savingGoal = useSelector(
    (state: RootState) => state.user.userInfo?.saving_goal
  );

  const savedAmount = useMemo(() => {
    return goalTransactionsCurrent.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  }, [goalTransactionsCurrent]);

  const { average: averagePutAwayNumber, diagramData } = useMemo(() => {
    return getGoalTransactionsDiagramData(
      goalTransactionsCurrent,
      registerDate
    );
  }, [goalTransactionsCurrent, registerDate]);

  const estimationDate = useMemo(() => {
    if (!savingGoal || !savedAmount || averagePutAwayNumber === 0) return "N/A";
    const monthsRemaining = Math.ceil(
      (savingGoal - savedAmount) / averagePutAwayNumber
    );
    const estimatedDate = new Date();
    estimatedDate.setMonth(estimatedDate.getMonth() + monthsRemaining);
    return estimatedDate.toLocaleDateString("uk-UA", {
      month: "long",
      year: "numeric",
    });
  }, [savingGoal, savedAmount, averagePutAwayNumber]);

  return (
    <div className="block block-flex-3 block-column-content">
      <div className="block-title">Історія відкладень</div>
      <div className="block-row-content">
        <BarChart data={diagramData} />
        <div className="spendings-history-info">
          <div>
            <span className="font-size-32">
              {averagePutAwayNumber.toLocaleString("uk-UA")}
            </span>
            <div> у середньому відкладається за місяць</div>
          </div>
          <div>
            <b>Досягнення цілі</b>
            <br /> очікується {estimationDate}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingHistoryStats;
