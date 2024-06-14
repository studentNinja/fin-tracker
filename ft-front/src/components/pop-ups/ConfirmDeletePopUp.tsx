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
        className="form-body pop-up  shadow"
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
                try {
                    props.confirmDelete();
                    props.cancel();
                } catch (error) {
                    alert((error as Error).message);
                }

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
