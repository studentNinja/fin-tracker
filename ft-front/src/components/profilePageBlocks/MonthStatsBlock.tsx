import React, { useEffect } from "react";
import deleteBtn from "../../assets/delete-btn.svg";
import { useDispatch, useSelector } from "react-redux";
import { Action, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  getBalance,
  getGoalTransactionsAmountCurrentMonth,
  getIncomeAmountCurrentMonth,
  getTransactionsAmountByCategoryId,
  getTransactionsAmountCurrentMonth,
} from "../../utils/dataUtils";
import { fetchUserProfile } from "../../features/user/userThunks";
import {
  fetchAllGoalTransactions,
  fetchCurrentGoalTransactions,
} from "../../features/goalTransactions/goalTransactionsThunks";
import { categoryMap } from "../../utils/categoryData";
import { fetchIncomes } from "../../features/income/incomeThunks";
import { fetchTransactions } from "../../features/transactions/transactionThunks";

const MonthStatsBlock = () => {
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const user = useSelector((state: RootState) => state.user.userInfo);
  const fixedExpenses = useSelector(
    (state: RootState) => state.fixedExpenses.fixedExpenses
  );
  const incomes = useSelector((state: RootState) => state.incomes.incomes);

  const goalTransactionsAll = useSelector(
    (state: RootState) => state.goalTransactions.goalTransactionsAll
  );
  const goalTransactionsCurrent = useSelector(
    (state: RootState) => state.goalTransactions.goalTransactionsCurrent
  );

  let transactionsTotalSum = getTransactionsAmountCurrentMonth(
    transactions,
    fixedExpenses
  );
  let goalTransactionsTotalSum =
    getGoalTransactionsAmountCurrentMonth(goalTransactionsAll);
  let incomeAmount = getIncomeAmountCurrentMonth(incomes);
  let balance = getBalance(
    goalTransactionsCurrent,
    transactions,
    fixedExpenses,
    incomes
  );
  let fixedExpensesAmount = getTransactionsAmountByCategoryId(
    1,
    categoryMap,
    transactions
  );
  let transactionsTotalSumWithoutFixed =
    transactionsTotalSum - fixedExpensesAmount;

  return (
    <div className="block block-flex-1 block-column-content">
      <div className="block-title">Статистика за місяць</div>
      <div className="income-number-container">
        <div className="income-container-title">Дохід:</div>
        <div className="income-number income-number-profile">
          {incomeAmount.toLocaleString("uk-UA")}
        </div>
      </div>
      <div className="line"></div>
      <div className="list">
        <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
          <div className="list-elem">
            <div className="font-weight-300">Відкладено</div>
            <div className="list-elem-end-block">
              <div>{goalTransactionsTotalSum.toLocaleString("uk-UA")}</div>
            </div>
          </div>
          <div className="list-line"></div>
        </div>
        <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
          <div className="list-elem">
            <div className="font-weight-300">Витрачено всього</div>
            <div className="list-elem-end-block">
              <div>{transactionsTotalSum.toLocaleString("uk-UA")}</div>
            </div>
          </div>
          <div className="list-line"></div>
        </div>
        <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
          <div className="list-elem">
            <div className="font-weight-300">
              Витрачено без постійних витрат
            </div>
            <div className="list-elem-end-block">
              <div>
                {transactionsTotalSumWithoutFixed.toLocaleString("uk-UA")}
              </div>
            </div>
          </div>
          <div className="list-line"></div>
        </div>
        <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
          <div className="list-elem">
            <div className="font-weight-300">Залишок</div>
            <div className="list-elem-end-block">
              <div>{balance.toLocaleString("uk-UA")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthStatsBlock;
