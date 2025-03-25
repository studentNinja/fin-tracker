import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
// import {toast} from "react-toastify";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onPay = async () => {}; //TODO: open checkout

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="form-container">
      <div className="form-body shadow max-width">
        <div className="form-h-holder ">
          <div className="center-div form-h">Оплатити підписку</div>
        </div>
        <div className="text-lg text-start">
          Дякуємо, що обрали наш фінансовий трекер для управління вашими
          фінансами! Щоб продовжити користування всіма функціями нашого сервісу,
          необхідно активувати підписку.
        </div>
        <div className="mt-2 text-5xl font-bold border border-black/10 rounded-md w-full py-4">
          $5<span className="text-lg font-normal">/місяць</span>
        </div>
        <button className="form-button">Оплатити</button>
      </div>
    </div>
  );
};

export default LoginPage;
