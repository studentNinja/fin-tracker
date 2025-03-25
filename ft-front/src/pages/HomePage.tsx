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
      data: [100000, 95000, 85000, 100000, 105000, 90000, 105000, 90000, 85000, 110000, 100000, 100000],
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
      min: 85000,
      max: 110000,
    },
  },
  maintainAspectRatio: false,
};

const HomePage: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <div className="dashboard-container shadow !text-lg flex flex-col !h-fit">
      <div className="feature w-full bg-white text-lg p-5 rounded-md text-start">
        <p>
          <b>FinTracker</b> – зручний і потужний інструмент для управління
          вашими фінансами.
        </p>
        <p>
          Він допоможе вам контролювати витрати, розподіляти бюджет та досягати
          фінансових цілей.
        </p>
      </div>
      <div className="flex w-full  gap-5">
        <div className="feature flex-1 rounded-md text-start p-5">
          <h3>Що пропонує FinTracker</h3>
          <div className="pl-5">
            <ul>
              <li>Простий облік витрат і доходів</li>
              <li>Аналіз фінансів</li>
              <li>Фінансові цілі</li>
            </ul>
          </div>
        </div>
        <div className="feature flex-1 rounded-md text-start p-5">
          <h3>Переваги нашого сервісу</h3>
          <div className="pl-5">
            <ul>
              <li>Безпека і конфіденційність</li>
              <li>Зручність і доступність</li>
              <li>Гнучкість</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="feature bg-white p-5 rounded-md w-full">
        <Line data={data} options={options} />
      </div>
      <div className="feature  p-5 rounded-md w-full flex justify-between items-center">
        <div className="font-bold text-2xl ">
          Зручно керуйте фінансами, легко досягайте цілей!
        </div>
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
