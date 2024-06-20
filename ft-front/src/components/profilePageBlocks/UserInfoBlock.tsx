import avatar from "../../assets/avatar-profile-page.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { formatDate } from "../../utils/dateUtils";
import { logout } from "../../features/auth/authSlice";
import { deleteUser, updatePassword } from "../../features/user/userThunks";
import { toast } from "react-toastify";
const UserInfoBlock = (props: {
  showConfirmDeletePopUp: (deleteFunct: () => void) => void;
  showChangePasswordPopUp: (
    changePassFunct: (currentPassword: string, newPassword: string) => void
  ) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const userName = user?.userInfo?.username;

  let date = formatDate(user?.userInfo?.registration_date);

  async function handleDeleteAccount() {
    alert("account deleted");
    await dispatch(deleteUser());
    dispatch(logout());
    navigate("/login");
  }

  async function handleChangePassword(
    currentPassword: string,
    newPassword: string
  ) {
    try {
      let res = await dispatch(
        updatePassword({ currentPassword, newPassword })
      );
      if (res.payload?.message) toast.success("Пароль успішно змінено");
      else if (res.payload?.error) toast.error("Помилка зміни паролю");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error changing password:", error);
        toast.error(error.message);
      }
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          onClick={(e) => {
            e.preventDefault();
            props.showChangePasswordPopUp(handleChangePassword);
          }}
          className="delete-option"
        >
          Змінити пароль
        </button>
        <button
          style={{ marginTop: 0 }}
          onClick={(e) => {
            e.preventDefault();
            props.showConfirmDeletePopUp(() => handleDeleteAccount());
          }}
          className="delete-option"
        >
          Видалити акаунт
        </button>
      </div>
    </div>
  );
};

export default UserInfoBlock;
