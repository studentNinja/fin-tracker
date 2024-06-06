import React from "react";
import deleteBtn from "../../../assets/delete-btn.svg";

const SpendingsHistoryPart = (props: {
  arraySpendings: Array<{
    id: number;
    date: string;
    title: string;
    number: number;
    category: number;
  }>;
  deleteSpending: (id: number) => void;
  clickAddSpendingBtn: () => void;
}) => {
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
        {props.arraySpendings.map((spending) => {
          return (
            <div
              key={spending.id}
              style={{ display: "flex", gap: "5px", flexDirection: "column" }}
            >
              <div className="list-elem">
                <div className="list-elem-start-block">
                  <div>{spending.date}</div>
                  <div>{spending.title}</div>
                </div>
                <div className="list-elem-end-block">
                  <div className="delete-btn">
                    <img
                      onClick={() => props.deleteSpending(spending.id)}
                      src={deleteBtn}
                      alt="delete"
                    />
                  </div>
                  <div>{spending.number.toLocaleString("uk-UA")}</div>
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
