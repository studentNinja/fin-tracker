import React from 'react';
import avatar from '../../assets/avatar-profile-page.svg'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {formatDate} from "../../utils/dateUtils";
import {logout} from "../../features/auth/authSlice";
const UserInfoBlock = (props: {
    showConfirmDeletePopUp: (deleteFunct: () => void) => void;
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector(
        (state: RootState) => state.user
    );
    const userName = user?.userInfo?.username

    let date=formatDate(user?.userInfo?.registration_date)

    function deleteAccount() {
        alert("account deleted")
        dispatch(logout());
        navigate("/login");
        /// to do: DELETE account
    }

    return (
        <div className="block block-flex-1 block-column-content user-info-block">
            <div className='img-container'>
                <img src={avatar} alt='avatar'/>
            </div>
            <div className='user-info-container'>
                <h4>{userName}</h4>
                <div className='register-date-container'>Дата реєстрації {date}</div>
            </div>
            <a href="#" onClick={(e)=> {
                e.preventDefault()
                props.showConfirmDeletePopUp(() =>
                    deleteAccount()
                )

            }} className="delete-option">Видалити акаунт</a>
        </div>
    );
};

export default UserInfoBlock;