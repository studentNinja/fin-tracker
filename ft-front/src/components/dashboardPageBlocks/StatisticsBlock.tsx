import React, { useEffect, useState } from "react";

import MonthsSpendingsDiagramPart from "./StatisticsComponents/MonthsSpendingsDiagramPart";
import CategoriesPart from "./StatisticsComponents/CategoriesPart";
import SpendingsHistoryPart from "./StatisticsComponents/SpendingsHistoryPart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  getTransactionsAmountByCategoryId,
  getTransactionsAmountCurrentMonth,
  getGoalTransactionsAmountCurrentMonth,
  getIncomeAmountCurrentMonth,
  getBalance,
  getTransactionsArrayCurrentMonth,
} from "../../utils/dataUtils";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {
  deleteTransaction,
  addTransaction,
} from "../../features/transactions/transactionThunks";
import { fetchUserProfile } from "../../features/user/userThunks";
import {
  fetchAllGoalTransactions,
  fetchCurrentGoalTransactions,
} from "../../features/goalTransactions/goalTransactionsThunks";
import { deleteFixedExpense } from "../../features/fixedExpenses/fixedExpensesThunks";
import {
  validateNumberToBePositive,
  validateTitle,
  validateTransaction,
} from "../../utils/validationUtils";
import {
  categoryColors,
  categoryMap,
  categoryNames,
} from "../../utils/categoryData";

const StatisticsBlock = (props: {
  showConfirmDeletePopUp: (deleteFunct: () => void) => void;
  showAddSpendingPopUp: (
    addFunct: (categoryId: number, title: string, number: number) => void
  ) => void;
}) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const user = useSelector((state: RootState) => state.user.userInfo);
  const goalTransactionsAll = useSelector(
    (state: RootState) => state.goalTransactions.goalTransactionsAll
  );
  const goalTransactionsCurrent = useSelector(
    (state: RootState) => state.goalTransactions.goalTransactionsCurrent
  );

  let transactionsTotalSum = getTransactionsAmountCurrentMonth(user);
  let goalTransactionsTotalSum =
    getGoalTransactionsAmountCurrentMonth(goalTransactionsAll);
  let incomeAmount = getIncomeAmountCurrentMonth(user);
  let balance = getBalance(user, goalTransactionsAll);

  let arraySpendings = getTransactionsArrayCurrentMonth(user);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchAllGoalTransactions());
    dispatch(fetchCurrentGoalTransactions());
  }, [dispatch, transactions]);

  const categories = Object.keys(categoryMap).map((key) => {
    const totalAmount = getTransactionsAmountByCategoryId(
      user,
      Number(key),
      categoryMap
    );
    return {
      id: Number(key),
      title: categoryNames[categoryMap[Number(key)]],
      color: categoryColors[Number(key)],
      number: totalAmount,
    };
  });

  function selectCategory(id: number) {
    if (selectedCategory === id) return;
    setSelectedCategory(id);
  }

  async function handleDeleteTransaction(id: string) {
    props.showConfirmDeletePopUp(() => {
      try {
        dispatch(deleteTransaction(id));
        dispatch(fetchUserProfile());
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    });
  }

  async function handleDeleteFixedExpense(id: string) {
    props.showConfirmDeletePopUp(() => {
      try {
        dispatch(deleteFixedExpense(id));
        dispatch(fetchUserProfile());
      } catch (error) {
        console.error("Error deleting fixed expense:", error);
      }
    });
  }

  function handleAddTransaction(
    categoryId: number,
    description: string,
    number: number
  ) {
    let newSpending = {
      date: new Date().toISOString(),
      description,
      category: categoryMap[categoryId],
      amount: number,
      userId: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      validateTitle(description);
      validateTransaction(number, balance);
      validateNumberToBePositive(number);

      dispatch(addTransaction(newSpending));
      dispatch(fetchUserProfile());
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  }

  return (
    <div className="block block-3">
      <MonthsSpendingsDiagramPart
        spentNumber={transactionsTotalSum}
        putAwayNumber={goalTransactionsTotalSum}
        income={incomeAmount}
      />
      <div className="line-vertical"></div>
      <CategoriesPart categories={categories} selectCategory={selectCategory} />
      <div className="line-vertical"></div>
      <SpendingsHistoryPart
        arraySpendings={arraySpendings}
        selectedCategory={selectedCategory}
        deleteSpending={handleDeleteTransaction}
        deleteFixedExpense={handleDeleteFixedExpense}
        clickAddSpendingBtn={() =>
          props.showAddSpendingPopUp(handleAddTransaction)
        }
      />
    </div>
  );
};

export default StatisticsBlock;
