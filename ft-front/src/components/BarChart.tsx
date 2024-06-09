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
let dataSet = {
  "01": 15000,
  "02": 12000,
  "03": 13000,
  "04": 10000,
  "05": 15000,
  "06": 7000,
};

export const options = {
  //   responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = Object.keys(dataSet);

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: dataSet,
      backgroundColor: "#F29B7F",
    },
  ],
};
const BarChart = () => {
  return <Bar options={options} data={data} />;
};

export default BarChart;
