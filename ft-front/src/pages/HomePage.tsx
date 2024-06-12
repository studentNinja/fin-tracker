import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/dashboard.css";
import "../styles/homePage.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const data = {
  labels: [
    "Січ",
    "Лют",
    "Бер",
    "Кві",
    "Тра",
    "Чер",
    "Лип",
    "Сер",
    "Вер",
    "Жов",
    "Лис",
    "Гру",
  ],
  datasets: [
    {
      label: "Витрати",
      data: [10, 9.5, 8.5, 10, 10.5, 9, 10.5, 9, 8.5, 11, 10, 11],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      fill: false,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      min: 8,
      max: 11.5,
    },
  },
  maintainAspectRatio: false,
};

const HomePage: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <div className="dashboard-container shadow">
      <div className="main-section">
        <p>
          <b>FinTracker</b> –{" "}
          <small>
            зручний і потужний інструмент для управління вашими фінансами.
          </small>
        </p>
        <p>
          <small>
            Допоможе вам контролювати витрати, розподіляти бюджет та досягати
            фінансових цілей.
          </small>
        </p>
      </div>
      <div className="features">
        <div className="feature">
          <h3>Що пропонує FinTracker</h3>
          <ul>
            <li>Простий облік витрат і доходів</li>
            <li>Аналіз фінансів</li>
            <li>Фінансові цілі</li>
          </ul>
        </div>
        <div className="feature">
          <h3>Переваги нашого сервісу</h3>
          <ul>
            <li>Безпека і конфіденційність</li>
            <li>Зручність і доступність</li>
            <li>Гнучкість</li>
          </ul>
        </div>
        <div className="chart">
          <Line data={data} options={options} />
        </div>
      </div>
      <div className="footer">
        <p>Зручно керуйте фінансами, легко досягайте цілей!</p>
        {!isAuthenticated ? (
          <Link to="/register">
            <button className="sign-up-btn">Зареєструватися!</button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
