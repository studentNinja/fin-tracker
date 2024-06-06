import React, { useState } from "react";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";
import "../styles/header.css";

const Header = () => {
  const [user, setUser] = useState(true);
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
            <div className="btn">Вийти</div>
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
