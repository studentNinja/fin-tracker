import { useMemo } from "react";
import BarChart from "./BarChart";
import { getGoalTransactionsDiagramData } from "../../utils/goalStatsDiagramUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  getRecentGoal,
  getSavedAmountCurrentGoal,
} from "../../utils/dataUtils";

const SpendingHistoryStats = () => {
  const goalTransactionsCurrent = useSelector(
    (state: RootState) => state.goalTransactions.goalTransactionsCurrent
  );
  const goalTransactionsAll = useSelector(
    (state: RootState) => state.goalTransactions.goalTransactionsAll
  );
  const registerDate = useSelector(
    (state: RootState) => state.user.userInfo?.registration_date
  );

  const goals = useSelector((state: RootState) => state.goals.goals);

  // Return goal from the User that is last created
  const lastGoal = getRecentGoal(goals);

  const goalAmount = lastGoal ? lastGoal.amount : 0;

  const savedAmount = lastGoal?.achieved
    ? goalAmount
    : getSavedAmountCurrentGoal(goalTransactionsCurrent);

  const { average: averagePutAwayNumber, diagramData } = useMemo(() => {
    return getGoalTransactionsDiagramData(goalTransactionsAll, registerDate);
  }, [goalTransactionsAll, registerDate]);

  const estimationDate = useMemo(() => {
    if (!goalAmount || averagePutAwayNumber === 0 || lastGoal?.achieved)
      return "N/A";
    const monthsRemaining = Math.ceil(
      (goalAmount - savedAmount) / averagePutAwayNumber
    );
    const estimatedDate = new Date();
    estimatedDate.setMonth(estimatedDate.getMonth() + monthsRemaining);
    return estimatedDate.toLocaleDateString("uk-UA", {
      month: "long",
      year: "numeric",
    });
  }, [goalAmount, savedAmount, averagePutAwayNumber, lastGoal]);

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
            <b>Очікувана дата досягнення цілі: </b>
            {estimationDate}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingHistoryStats;
