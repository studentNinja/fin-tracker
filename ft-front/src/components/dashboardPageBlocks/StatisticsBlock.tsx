import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchTransactions, deleteTransaction, addTransaction } from "../../features/transactions/transactionThunks";
import MonthsSpendingsDiagramPart from "./StatisticsComponents/MonthsSpendingsDiagramPart";
import CategoriesPart from "./StatisticsComponents/CategoriesPart";
import SpendingsHistoryPart from "./StatisticsComponents/SpendingsHistoryPart";
import { Category } from "../../types/categoryTypes";
import { Transaction } from "../../types/transactionTypes";
import { Data } from "../../data/data";

interface TransformedSpending {
  id: string;
  date: string;
  description: string;
  number: number;
  category: number;
}

const categoryMap: Record<number, Category> = {
  1: 'fixed',
  2: 'clothes',
  3: 'lifestyle',
  4: 'pets',
  5: 'medicine',
  6: 'food',
  7: 'transport',
  8: 'other'
};

const categoryColors: Record<number, string> = {
  1: 'blue',
  2: 'green',
  3: 'orange',
  4: 'purple',
  5: 'yellow',
  6: 'pink',
  7: 'yellow-green',
  8: 'grey'
};

const StatisticsBlock = (props: {
  showConfirmDeletePopUp: (deleteFunct: () => void) => void;
  showAddSpendingPopUp: (
      addFunct: (categoryId: number, description: string, number: number) => void
  ) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const state = useSelector((state: RootState) => state);
  const data = new Data(state);

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [arraySpendingsFiltered, setArraySpendingsFiltered] = useState<TransformedSpending[]>([]);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    setArraySpendingsFiltered(transformTransactions(transactions));
  }, [transactions]);

  const totalIncome = data.getIncomeAmount();
  const totalSpent = data.getTransactionsAmount();
  const totalPutAway = data.getSavedAmountByCurrentMonth();
  const moneyLeft = totalIncome - totalSpent - totalPutAway;

  function transformTransactions(transactions: Transaction[]): TransformedSpending[] {
    return transactions.map((transaction) => ({
      id: transaction._id,
      date: transaction.date,
      description: transaction.description || '',
      number: transaction.amount,
      category: Number(Object.keys(categoryMap).find(key => categoryMap[Number(key)] === transaction.category))
    }));
  }

  function selectCategory(id: number) {
    if (selectedCategory === id) return;
    setSelectedCategory(id);
    if (id === 0) setArraySpendingsFiltered(transformTransactions(transactions));
    else
      setArraySpendingsFiltered(
          transformTransactions(transactions).filter((spending) => spending.category === id)
      );
  }

  function deleteSpending(id: string) {
    props.showConfirmDeletePopUp(() => {
      dispatch(deleteTransaction(id));
    });
  }

  function addSpending(categoryId: number, description: string, number: number) {
    if (description.length === 0) throw new Error("Введіть назву");
    if (!validateSpendingNumber(number))
      throw new Error("Недостатньо коштів для здійснення операції");

    if (number <= 0) throw new Error("Неправильне значення суми");
    let date = getDate();

    let newSpending = {
      date,
      description,
      category: categoryMap[categoryId],
      amount: number,
      userId: 'help',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    dispatch(addTransaction(newSpending));
  }

  function getDate() {
    let monthNumber = new Date().getMonth() + 1;
    let month = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;

    let dayNumber = new Date().getDate();
    let day = dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;
    return `${day}.${month}`;
  }

  function validateSpendingNumber(number: number) {
    return moneyLeft >= number;
  }

  const categories = Object.keys(categoryMap).map(key => {
    const categoryTransactions = transactions.filter(transaction => categoryMap[Number(key)] === transaction.category);
    const totalAmount = categoryTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    return {
      id: Number(key),
      title: categoryMap[Number(key)],
      color: categoryColors[Number(key)],
      number: totalAmount
    };
  });

  return (
      <div className="block block-3">
        <MonthsSpendingsDiagramPart
            spentNumber={totalSpent}
            putAwayNumber={totalPutAway}
            income={totalIncome}
        />
        <div className="line-vertical"></div>
        <CategoriesPart
            categories={categories}
            selectCategory={selectCategory}
        />
        <div className="line-vertical"></div>
        <SpendingsHistoryPart
            arraySpendings={arraySpendingsFiltered.reverse()}
            deleteSpending={deleteSpending}
            clickAddSpendingBtn={() => props.showAddSpendingPopUp(addSpending)}
        />
      </div>
  );
};

export default StatisticsBlock;
