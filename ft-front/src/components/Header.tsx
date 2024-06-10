import React, { useState } from "react";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";
import "../styles/header.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userName = useSelector(
    (state: RootState) => state.user?.userInfo?.username
  );
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div>
      <header className="shadow">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>
        {isAuthenticated ? (
          <div className="header-option">
            <Link to="/dashboard">?Dashboard?</Link>
          </div>
        ) : (
          ""
        )}
        {isAuthenticated ? (
          <div className="account-box">
            <div className="btn" onClick={handleLogout}>
              Вийти
            </div>
            <Link to="/profile">
              <div className="avatar-container">
                <img className="avatar" src={avatar} alt="avatar" />
              </div>
            </Link>

            <div>{userName}</div>
          </div>
        ) : (
          <div className="account-box">
            <div className="btn" onClick={() => navigate("/login")}>
              Увійти
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
