import React, {useEffect, useState} from "react";

import MonthsSpendingsDiagramPart from "./StatisticsComponents/MonthsSpendingsDiagramPart";
import CategoriesPart from "./StatisticsComponents/CategoriesPart";
import SpendingsHistoryPart from "./StatisticsComponents/SpendingsHistoryPart";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Data} from "../../utils/dataUtils";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {Category} from "../../types/categoryTypes";
import {deleteIncome, fetchIncomes} from "../../features/income/incomeThunks";
import {addTransaction, deleteTransaction} from "../../features/transactions/transactionThunks";
import {fetchUserProfile} from "../../features/user/userThunks";
import {
  fetchAllGoalTransactions,
  fetchCurrentGoalTransactions
} from "../../features/goalTransactions/goalTransactionsThunks";
import {categoryColors, categoryMap, categoryNames} from "../../utils/categoryData";

const StatisticsBlock = (props: {
  showConfirmDeletePopUp: (deleteFunct: () => void) => void;
  showAddSpendingPopUp: (
    addFunct: (categoryId: number, title: string, number: number) => void
  ) => void;
}) => {


  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();


  const data = useSelector((state: RootState) => {
    return new Data(state.user.userInfo ,state.goalTransactions.goalTransactionsCurrent, state.goalTransactions.goalTransactionsAll);
  });




  let transactionsTotalSum=data.getTransactionsAmountCurrentMonth()
  let goalTransactionsTotalSum=data.getGoalTransactionsAmountCurrentMonth()
  let incomeAmount=data.getIncomeAmountCurrentMonth()



  let moneyLeft = 105000;


  let arraySpendings = data.getTransactionsArrayCurrentMonth();
  let [selectedCategory, setSelectedCategory] = useState(0);


  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchAllGoalTransactions());
    dispatch(fetchCurrentGoalTransactions());
  }, [dispatch]);

  const categories = Object.keys(categoryMap).map(key => {

    const totalAmount = data.getTransactionsAmountByCategoryId(+key, categoryMap)
        return {
      id: Number(key),
      title: categoryNames[categoryMap[Number(key)]],
      color: categoryColors[Number(key)],
      number: totalAmount
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



  function handleAddTransaction(categoryId: number, description: string, number: number) {
    if (description.length === 0) throw new Error("Введіть назву");
    if (!validateSpendingNumber(number))
      throw new Error("Недостатньо коштів для здійснення операції");

    if (number <= 0) throw new Error("Неправильне значення суми");

    let newSpending = {
      date: new Date().toISOString(),
      description,
      category: categoryMap[categoryId],
      amount: number,
      userId: 'help',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    try {
      dispatch(addTransaction(newSpending));
      dispatch(fetchUserProfile());
    } catch (error) {
      console.error("Error adding transaction:", error);
    }

  }

  function validateSpendingNumber(number: number) {
    return moneyLeft >= number;
  }

  return (
    <div className="block block-3">
      <MonthsSpendingsDiagramPart
        spentNumber={transactionsTotalSum}
        putAwayNumber={goalTransactionsTotalSum}
        income={incomeAmount}
      />
      <div className="line-vertical"></div>
      <CategoriesPart categories={categories}
                      selectCategory={selectCategory} />
      <div className="line-vertical"></div>
      <SpendingsHistoryPart
        arraySpendings={arraySpendings}
        selectedCategory={selectedCategory}
        deleteSpending={handleDeleteTransaction}
        clickAddSpendingBtn={() => props.showAddSpendingPopUp(handleAddTransaction)}
      />
    </div>
  );
};

export default StatisticsBlock;
