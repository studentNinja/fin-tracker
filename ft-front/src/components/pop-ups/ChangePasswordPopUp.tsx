import React, { useState } from "react";
import "../../styles/pop-up.css";

const ChangeNumberPopUp = (props: {
  cancel: () => void;
  confirmChange: (currentPassword:string, newPassword:string) => void;
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div
      className="pop-up-bg"
      onClick={(e) => {
        props.cancel();
      }}
    ><form onSubmit={(e) => {
        e.preventDefault()
        try {
            props.confirmChange(currentPassword, newPassword );
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
        <div className="pop-up-h">Змінити пароль</div>
        <div className="input-title-pop-up">
          Введіть поточний пароль
          <input
            minLength={8}
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            className="input-pop-up"
            required
          />
        </div>
            <div className="input-title-pop-up">
          Введіть новий пароль
          <input
            minLength={8}
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
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
            className="btn form-button btn-pop-up "
            type="submit"
          >
           Змінити
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default ChangeNumberPopUp;
