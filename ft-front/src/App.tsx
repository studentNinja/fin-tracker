import React, { useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";
import "./styles/App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import "./styles/form.css";
import "./styles/list-animation.css";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./features/user/userThunks";
import { AppDispatch } from "./app/store";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
