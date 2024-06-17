import React from "react";
import avatar from "../../assets/avatar-profile-page.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { formatDate } from "../../utils/dateUtils";
import { logout } from "../../features/auth/authSlice";
import {deleteUser, updatePassword} from "../../features/user/userThunks";
const UserInfoBlock = (props: {
  showConfirmDeletePopUp: (deleteFunct: () => void) => void;
  showChangePasswordPopUp: (changePassFunct: (currentPassword:string, newPassword:string ) => void) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const userName = user?.userInfo?.username;

  let date = formatDate(user?.userInfo?.registration_date);

  async function handleDeleteAccount() {
    alert("account deleted");
    await dispatch(deleteUser())
    dispatch(logout());
    navigate("/login");

  }
  function handleChangePassword(currentPassword:string, newPassword:string ) {
      try{
          dispatch(updatePassword({currentPassword, newPassword}))
      }catch (error) {
          console.error("Error changing password:", error);
      }

  }



  return (
    <div className="block block-flex-1 block-column-content user-info-block">
      <div className="img-container">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="user-info-container">
        <h4>{userName}</h4>
        <div className="register-date-container">Дата реєстрації {date}</div>
      </div>
        <div style={{display:"flex", flexDirection:"column"}}><a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                props.showChangePasswordPopUp(handleChangePassword);
            }}
            className="delete-option"
        >
            Змінити пароль
        </a>
      <a style={{marginTop:0}}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          props.showConfirmDeletePopUp(() => handleDeleteAccount());
        }}
        className="delete-option"
      >
        Видалити акаунт
      </a>

    </div>
    </div>
  );
};

export default UserInfoBlock;
