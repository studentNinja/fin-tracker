import React, { useEffect, useState } from "react";
import deleteBtn from "../../assets/delete-btn.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { FixedExpense } from "../../types/fixedExpenseTypes";
import {
  fetchFixedExpenses,
  addFixedExpense as addFixedExpenseThunk,
  deleteFixedExpense as deleteFixedExpenseThunk,
  getFixedExpenseById,
} from "../../features/fixedExpenses/fixedExpensesThunks";
import { Category } from "../../types/categoryTypes";
import {getBalance} from "../../utils/dataUtils";

const FixedExpensesBlock = (props: {
  showConfirmDeletePopUp: (deleteFunct: () => void) => void;
  showPopUpAddFixedExpense: (
    addFunct: (name: string, amount: number) => void
  ) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFixedExpenses());
  }, [dispatch]);
  const fixedExpenses = useSelector(
    (state: RootState) => state.fixedExpenses.fixedExpenses
  );
  const loading = useSelector(
    (state: RootState) => state.fixedExpenses.loading
  );
  const error = useSelector((state: RootState) => state.fixedExpenses.error);
  const user = useSelector((state: RootState) => state.user.userInfo);
  const goalTransactionsAll = useSelector(
      (state: RootState) => state.goalTransactions.goalTransactionsAll
  );

  let balance = getBalance(user, goalTransactionsAll);

  let [arrayFixedExpenses, setArrayFixedExpenses] = useState<FixedExpense[]>(
    []
  );

  useEffect(() => {
    if (fixedExpenses) {
      setArrayFixedExpenses(fixedExpenses);
    }
  }, [fixedExpenses]);

  function handleAddFixedExpense(name: string, amount: number) {
    if (name.length === 0) throw new Error("Введіть назву");
    if (!validateSpendingNumber(amount))
      throw new Error("Недостатньо коштів для здійснення операції");

    if (amount <= 0) throw new Error("Неправильне значення суми");

    const newExpense = {
      name,
      amount,
      category: "fixed" as Category,
    };
    dispatch(addFixedExpenseThunk(newExpense));
  }

  function validateSpendingNumber(number: number) {
    return balance >= number;
  }

  function handleDeleteFixedExpense(id: string) {
    dispatch(deleteFixedExpenseThunk(id));
  }

  return (
    <div className="block block-flex-1 block-column-content">
      <div className="block-title">Постійні витрати</div>
      <div className="income-number-container">
        <div className="income-number">
          {
            arrayFixedExpenses
              .reduce((res, curr) => res + curr.amount, 0)
              .toLocaleString("uk-UA")
          }
        </div>
        <div
          className="add-btn"
          onClick={() =>
            props.showPopUpAddFixedExpense((name: string, amount: number) =>
              handleAddFixedExpense(name, amount)
            )
          }
        >
          +
        </div>
      </div>
      <div className="line"></div>

      <div className="list">
        {arrayFixedExpenses.map((expense) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default FixedExpensesBlock;
