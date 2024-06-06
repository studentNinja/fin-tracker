import React from "react";
import DashboardPage from "./pages/DashboardPage";
import "./styles/App.css";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <DashboardPage />
    </div>
  );
};

export default App;
