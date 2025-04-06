import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import PayPalButton from "../components/PayPalButton";
import axios from "axios";
import Cookies from 'js-cookie';  // You'll need to install this package

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  
  console.log("Redux auth state:", useSelector((state: RootState) => state.auth));
  const BaseUrl = process.env.REACT_APP_BACK_URL

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  
  const handlePaymentSuccess = async (details: any) => {
    console.log("Payment Success:", details);
    try {

      const userIdFromCookie = localStorage.getItem('pendingUserId');
      const userIdToUse = userIdFromCookie;
      
      console.log("Using user ID:", userIdToUse);
      
      if (userIdToUse) {
        const res = await axios.post({BaseUrl}+"api/payment/success", {
          userId: userIdToUse,
          paymentId: details.id,
        });
        
        if (res.data.success) {
          localStorage.removeItem('pendingUserId');
          alert("Payment successful! Your subscription is activated.");
          // navigate("/login"); // Redirect to login to authenticate with updated status
        } else {
          alert("Payment verification failed. Please contact support.");
        }
      } else {
        alert("User ID not found. Please try logging in again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error processing payment.");
    }
  };
  
  return (
    <div className="form-container">
      <div className="form-body shadow max-width">
        <div className="form-h-holder ">
          <div className="center-div form-h">Оплатити підписку</div>
        </div>
        <div className="text-lg text-start">
          Дякуємо, що обрали наш фінансовий трекер для управління вашими фінансами! Щоб продовжити
          користування всіма функціями нашого сервісу, необхідно активувати підписку.
        </div>
        <div className="mt-2 text-5xl font-bold border border-black/10 rounded-md w-full py-4">
          $5<span className="text-lg font-normal">/місяць</span>
        </div>
        <PayPalButton amount="5.00" onSuccess={handlePaymentSuccess} />
      </div>
    </div>
  );
};

export default LoginPage;