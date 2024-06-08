import React from 'react';
import avatar from '../../assets/avatar-profile-page.svg'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {formatDate} from "../../utils/dateUtils";
const UserInfoBlock = () => {

    const user = useSelector(
        (state: RootState) => state.user
    );
    const userName = user?.userInfo?.username

    let date=formatDate(user?.userInfo?.registration_date)



    return (
        <div className="block block-flex-1 block-column-content user-info-block">
            <div className='img-container'>
                <img src={avatar} alt='avatar'/>
            </div>
            <div className='user-info-container'>
                <h4>{userName}</h4>
                <div className='register-date-container'>Дата реєстрації {date}</div>
            </div>
            <Link to="#" className="delete-option">Видалити акаунт</Link>
        </div>
    );
};

export default UserInfoBlock;