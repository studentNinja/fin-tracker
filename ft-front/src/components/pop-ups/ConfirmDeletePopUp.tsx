import React from "react";
import "../../styles/pop-up.css";

interface ConfirmDeletePopUpProps {
  cancel: () => void;
  confirmDelete: () => void;
}

const ConfirmDeletePopUp: React.FC<ConfirmDeletePopUpProps> = ({
  cancel,
  confirmDelete,
}) => {
  return (
    <div className="pop-up-bg" onClick={cancel}>
      <div
        className="form-body pop-up shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pop-up-h">Підтвердіть операцію видалення</div>
        <div className="button-container">
          <div className="btn btn-pop-up btn-pop-up-cancel" onClick={cancel}>
            Скасувати
          </div>
          <div
            className="btn btn-pop-up"
            onClick={() => {
              try {
                confirmDelete();
                cancel();
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
