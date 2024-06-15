import React, { useEffect } from "react";
import deleteBtn from "../../../assets/delete-btn.svg";
import { Transaction } from "../../../types/transactionTypes";
import { formatDateAndMonth } from "../../../utils/dateUtils";
import { categoryMap } from "../../../utils/categoryData";
import { fetchTransactions } from "../../../features/transactions/transactionThunks";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";

const SpendingsHistoryPart = (props: {
  selectedCategory: number;
  deleteSpending: (id: string) => void;
  deleteFixedExpense: (id: string) => void;
  clickAddSpendingBtn: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const spendings = useSelector(
    (state: RootState) => state.transactions.transactions
  );

  let arraySpendingsFiltered = spendings.slice();

  if (props.selectedCategory !== 0) {
    arraySpendingsFiltered = spendings.filter(
      (spending) => spending.category === categoryMap[props.selectedCategory]
    );
  }

  return (
    <div className="spendings-history-part">
      <div className="list-elem-start-block">
        <div className="block-title">Історія витрат</div>
        <div className="list-elem-end-block">
          <div className="add-btn" onClick={() => props.clickAddSpendingBtn()}>
            +
          </div>
        </div>
      </div>

      <div className="list">
        {arraySpendingsFiltered.map((spending) => (
          <div
            key={spending._id}
            style={{ display: "flex", gap: "5px", flexDirection: "column" }}
          >
            <div className="list-elem">
              <div className="list-elem-start-block">
                <div>{formatDateAndMonth(spending.date)}</div>
                <div>{spending.description}</div>
              </div>
              <div className="list-elem-end-block">
                <div className="delete-btn">
                  <img
                    onClick={() => {
                      if (spending.category === "fixed")
                        props.deleteFixedExpense(spending._id);
                      else props.deleteSpending(spending._id);
                    }}
                    src={deleteBtn}
                    alt="delete"
                  />
                </div>
                <div>{spending.amount.toLocaleString("uk-UA")}</div>
              </div>
            </div>
            <div className="list-line"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingsHistoryPart;
