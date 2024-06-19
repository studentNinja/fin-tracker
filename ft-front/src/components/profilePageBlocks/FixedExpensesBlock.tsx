import React, { useEffect, useState } from "react";
import deleteBtn from "../../assets/delete-btn.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { FixedExpense } from "../../types/fixedExpenseTypes";
import {
  fetchFixedExpenses,
  addFixedExpense as addFixedExpenseThunk,
  deleteFixedExpense as deleteFixedExpenseThunk,
} from "../../features/fixedExpenses/fixedExpensesThunks";
import { Category } from "../../types/categoryTypes";
import { getBalance } from "../../utils/dataUtils";
import {validateNumberToBePositive, validateTransaction} from "../../utils/validationUtils";
import {tryCatch} from "msw/lib/core/utils/internal/tryCatch";
import {toast} from "react-toastify";

const FixedExpensesBlock = (props: {
  showConfirmDeletePopUp: (deleteFunct: () => void) => void;
  showPopUpAddFixedExpense: (
    addFunct: (
      name: string,
      amount: number,
      setError: (field: string, message: string) => void
    ) => void
  ) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFixedExpenses());
  }, [dispatch]);

  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const incomes = useSelector((state: RootState) => state.incomes.incomes);

  const fixedExpenses = useSelector(
    (state: RootState) => state.fixedExpenses.fixedExpenses
  );
  const balance = useSelector((state: RootState) =>
    getBalance(
      state.goalTransactions.goalTransactionsAll,
      transactions,
      fixedExpenses,
      incomes
    )
  );

  const [errorState, setErrorState] = useState({ name: "", amount: "" });

  function handleAddFixedExpense(
    name: string,
    amount: number,
    setError: (field: string, message: string) => void
  ) {
    let hasError = false;

    if (name.length === 0) {
      setError("name", "Введіть назву");
      hasError = true;
    }
    if (amount <= 0) {
      setError("amount", "Неправильне значення суми");
      hasError = true;
    }
    if (balance < amount) {
      setError("amount", "Недостатньо коштів для здійснення операції");
      hasError = true;
    }
    try {
      validateNumberToBePositive(amount);
      validateTransaction(amount, balance)
    if (hasError) {
      return;
    }


    const newExpense = {
      name,
      amount,
      category: "fixed" as Category,
    };
    dispatch(addFixedExpenseThunk(newExpense));
    }catch (error) {
      if (error instanceof Error) {
        console.error("Error transaction:", error);
        toast.error(error.message);
      }
    }
  }

  function handleDeleteFixedExpense(id: string) {
    dispatch(deleteFixedExpenseThunk(id));
  }

  return (
    <div className="block block-flex-1 block-column-content">
      <div className="block-title">Постійні витрати</div>
      <div className="income-number-container">
        <div className="income-number">
          {fixedExpenses
            .reduce((res, curr) => res + curr.amount, 0)
            .toLocaleString("uk-UA")}
        </div>
        <div
          className="add-btn"
          onClick={() =>
            props.showPopUpAddFixedExpense((name, amount, setError) =>
              handleAddFixedExpense(name, amount, setError)
            )
          }
        >
          +
        </div>
      </div>
      <div className="line"></div>

      <div className="list">
        {fixedExpenses.map((expense) => (
          <div
            key={expense._id}
            style={{ display: "flex", gap: "5px", flexDirection: "column" }}
          >
            <div className="list-elem">
              <div>{expense.name}</div>
              <div className="list-elem-end-block">
                <div className="delete-btn">
                  <img
                    src={deleteBtn}
                    onClick={() =>
                      props.showConfirmDeletePopUp(() =>
                        handleDeleteFixedExpense(expense._id)
                      )
                    }
                    alt="delete"
                  />
                </div>
                <div>{expense.amount.toLocaleString("uk-UA")}</div>
              </div>
            </div>
            <div className="list-line"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixedExpensesBlock;
