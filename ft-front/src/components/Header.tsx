import React, { useState } from "react";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";
import "../styles/header.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const [user, setUser] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div>
      <header className="shadow">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        {user ? (
          <div className="header-option">
            <a href="#">?Dashboard?</a>
          </div>
        ) : (
          ""
        )}
        {user ? (
          <div className="account-box">
            <div className="btn" onClick={handleLogout}>
              Вийти
            </div>
            <div className="avatar-container">
              <img className="avatar" src={avatar} alt="avatar" />
            </div>
          </div>
        ) : (
          <div className="account-box">
            <div className="btn">Увійти</div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
