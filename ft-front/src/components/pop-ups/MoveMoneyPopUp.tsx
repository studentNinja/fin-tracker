import React, { useState } from "react";
import "../../styles/pop-up.css";

const MoveMoneyPopUp = (props: {
  title: string;
  cancel: () => void;
  confirmMove: (number: number) => void;
}) => {
  const [number, setNumber] = useState(0);

  return (
    <div
      className="pop-up-bg"
      onClick={(e) => {
        props.cancel();
      }}
    >
      <div
        className="pop-up-body shadow"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="pop-up-h">{props.title}</div>
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
                props.confirmMove(number);
                props.cancel();
              } catch (error) {
                alert((error as Error).message);
              }
            }}
          >
            {props.title.split(" ")[0]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveMoneyPopUp;
