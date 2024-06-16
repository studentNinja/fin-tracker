import React, { useEffect } from "react";
import deleteBtn from "../../assets/delete-btn.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  fetchIncomes,
  addIncome,
  deleteIncome,
} from "../../features/income/incomeThunks";
import { ThunkDispatch, Action } from "@reduxjs/toolkit";
import { fetchUserProfile } from "../../features/user/userThunks";
import {
  validateIncomeDelete,
  validateTitle,
} from "../../utils/validationUtils";
import {
  getIncomeArrayCurrentMonth,
  getIncomeAmountCurrentMonth,
  getBalance,
} from "../../utils/dataUtils";

interface Props {
  showPopUpAddIncome: (
    addFunct: (title: string, number: number) => void
  ) => void;
  showConfirmDeletePopUp: (deleteFunct: () => void) => void;
}

const IncomeBlock: React.FC<Props> = (props) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>();

  useEffect(() => {
    dispatch(fetchIncomes());
  }, [dispatch]);

  const incomes = useSelector((state: RootState) => state.incomes.incomes);
  const goalTransactionsAll = useSelector(
    (state: RootState) => state.goalTransactions.goalTransactionsAll
  );

  const goalTransactionsCurrent = useSelector(
    (state: RootState) => state.goalTransactions.goalTransactionsAll
  );

  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const fixedExpenses = useSelector(
    (state: RootState) => state.fixedExpenses.fixedExpenses
  );

  let arrayIncome = getIncomeArrayCurrentMonth(incomes);
  let incomeAmount = getIncomeAmountCurrentMonth(incomes);
  let balance = getBalance(
    goalTransactionsCurrent,
    transactions,
    fixedExpenses,
    incomes
  );


  async function handleDeleteIncome(id: string, amount: number) {
    try {
      validateIncomeDelete(amount, balance);

      await dispatch(deleteIncome(id));
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  }

  async function handleAddIncome(title: string, number: number) {
    try {
      validateTitle(title);
      await dispatch(
        addIncome({
          source: title,
          amount: number,
          userId: "",
          date: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          category: "income",
        })
      );
    } catch (error) {
      console.error("Error adding income:", error);
    }
  }

  return (
    <div className="block block-1">
      <div className="block-title">Дохід за місяць</div>
      <div className="income-number-container">
        <div className="income-number">
          {incomeAmount.toLocaleString("uk-UA")}
        </div>
        <div
          className="add-btn"
          onClick={() => {
            props.showPopUpAddIncome(handleAddIncome);
          }}
        >
          +
        </div>
      </div>
      <div className="line"></div>
      <div className="list">
        {arrayIncome.map((income) => (
          <div
            key={income._id}
            style={{ display: "flex", gap: "5px", flexDirection: "column" }}
          >
            <div className="list-elem">
              <div>{income.source}</div>
              <div className="list-elem-end-block">
                <div className="delete-btn">
                  <img
                    src={deleteBtn}
                    onClick={() =>
                      props.showConfirmDeletePopUp(() =>
                        handleDeleteIncome(income._id, income.amount)
                      )
                    }
                    alt="delete"
                  />
                </div>
                <div>{income.amount.toLocaleString("uk-UA")}</div>
              </div>
            </div>
            <div className="list-line"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeBlock;
