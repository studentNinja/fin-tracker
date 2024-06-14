import React, { useState } from "react";
import deleteBtn from "../../../assets/delete-btn.svg";
import { Transaction } from "../../../types/transactionTypes";
import { formatDateAndMonth } from "../../../utils/dateUtils";
import { categoryMap } from "../../../utils/categoryData";

const SpendingsHistoryPart = (props: {
  arraySpendings: Transaction[];
  selectedCategory: number;
  deleteSpending: (id: string) => void;
  clickAddSpendingBtn: () => void;
}) => {
  let arraySpendingsFiltered = props.arraySpendings.slice();

  if (props.selectedCategory === 0)
    arraySpendingsFiltered = props.arraySpendings.slice();
  else
    arraySpendingsFiltered = props.arraySpendings.filter(
      (spending) => spending.category === categoryMap[props.selectedCategory]
    );
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
        {arraySpendingsFiltered.map((spending) => {
          return (
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
                      onClick={() => props.deleteSpending(spending._id)}
                      src={deleteBtn}
                      alt="delete"
                    />
                  </div>
                  <div>{spending.amount.toLocaleString("uk-UA")}</div>
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

export default SpendingsHistoryPart;
