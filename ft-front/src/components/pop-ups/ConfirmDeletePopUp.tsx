import React from "react";
import "../../styles/pop-up.css";

const ConfirmDeletePopUp = (props: {
  cancel: () => void;
  confirmDelete: () => void;
}) => {
  return (
    <div
      className="pop-up-bg"
      onClick={(e) => {
        props.cancel();
      }}
    >
      <div
        className="pop-up-body  shadow"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="pop-up-h">Підтвердіть операцію видалення</div>
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
              props.confirmDelete();
              props.cancel();
            }}
          >
            Підтвердити
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopUp;
