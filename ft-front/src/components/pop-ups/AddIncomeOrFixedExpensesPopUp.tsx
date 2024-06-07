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
    ><form onSubmit={(e) => {
      e.preventDefault()
      try {
        props.confirmAdd(title, number);
        props.cancel();
      } catch (error) {
        alert((error as Error).message);
      }
    }}>
      <div
        className="form-body pop-up shadow"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="pop-up-h">{props.title}</div>
        <div className="input-title-pop-up">
          Введіть назву
          <input
            minLength={3}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="input-pop-up"
            required
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
            required
          />
        </div>
        <div className="button-container">
          <div
            className="btn form-button btn-pop-up btn-pop-up-cancel "
            onClick={(e) => {
              props.cancel();
            }}
          >
            Скасувати
          </div>
          <button
            className="btn  form-button btn-pop-up"
            type="submit"

          >
            Додати
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default AddIncomeOrFixedExpensesPopUp;
