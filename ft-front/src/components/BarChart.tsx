import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataSet {
  [key: string]: number;
}

const dataSet: DataSet = {
  "01": 15000,
  "02": 12000,
  "03": 13000,
  "04": 10000,
  "05": 15000,
  "06": 7000,
};

const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  maintainAspectRatio: false,
};

const labels = Object.keys(dataSet);

const data = {
  labels,
  datasets: [
    {
      data: Object.values(dataSet),
      backgroundColor: "#F29B7F",
      borderRadius: 5,
    },
  ],
};

const BarChart: React.FC = () => {
  return (
    <div
      style={{
        width: "500px",
        height: "220px",
        padding: "10px",
      }}
    >
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
