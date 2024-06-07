import React, { useState } from "react";
import "../../styles/pop-up.css";

const AddIncomeOrFixedExpensesPopUp = (props: {
  title: string;
  cancel: () => void;
  confirmAdd: (title: string, number: number) => void;
}) => {
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState(1000);

  return (
    <div
      className="pop-up-bg"
      onClick={(e) => {
        props.cancel();
      }}
    >
      <div
        className="form-body shadow"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="pop-up-h">{props.title}</div>
        <div className="input-title-pop-up">
          Введіть назву
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="input-pop-up"
          />
        </div>
        <div className="input-title-pop-up">
          Введіть суму
          <input
            min="1"
            type="number"
            value={number}
            onChange={(event) => setNumber(+event.target.value)}
            className="input-pop-up"
          />
        </div>
        <div className="button-container">
          <div
            className="btn btn-pop-up btn-pop-up-cancel "
            onClick={(e) => {
              props.cancel();
            }}
          >
            Скасувати
          </div>
          <div
            className="btn btn-pop-up "
            onClick={(e) => {
              try {
                props.confirmAdd(title, number);
                props.cancel();
              } catch (error) {
                alert((error as Error).message);
              }
            }}
          >
            Додати
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIncomeOrFixedExpensesPopUp;
