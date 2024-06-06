import React from "react";
import DashboardPage from "./pages/DashboardPage";
import "./styles/App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
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
      </Routes>
    </div>
  );
};

export default App;
