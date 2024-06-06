import React from "react";
import ReactDOM from "react-dom/client"; // Імпортуйте createRoot
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";
import "./styles/index.css";
import "./styles/buttons.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
