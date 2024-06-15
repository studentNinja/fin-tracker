import React from "react";
import BarChart from "./BarChart";
import {getGoalTransactionsDiagramData} from "../../utils/goalStatsDiagramUtils";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

const SpengingHistoryStats = () => {
  let estimationDate = "12.2024";
  let averagePutAwayNumber = 15000;

  const goalTransactionsAll = useSelector(
      (state: RootState) => state.goalTransactions.goalTransactionsAll
  );
  const registerDate = useSelector((state: RootState) => state.user.userInfo?.registration_date);
  // getGoalTransactionsDiagramData(goalTransactionsAll,registerDate)



  return (
    <div className="block block-flex-3 block-column-content">
      <div className="block-title">Історія відкладень</div>
      <div className="block-row-content">
        <BarChart></BarChart>
        <div className="spendings-history-info">
          <div>
            <span className="font-size-32">
              {averagePutAwayNumber.toLocaleString("uk-ua")}
            </span>
            <div> у середньому відкладається за місяць</div>
          </div>

          <div>
            {/*to do: change to month name*/}
            <b>Досягнення цілі</b>
            <br /> очікується {estimationDate}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpengingHistoryStats;
