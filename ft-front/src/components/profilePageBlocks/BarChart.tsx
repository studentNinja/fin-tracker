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

interface BarChartProps {
  data: Record<string, number>;
}

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

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const labels = Object.keys(data);
  const chartData = {
    labels,
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: "#F29B7F",
        borderRadius: 5,
      },
    ],
  };

  return (
    <div
      style={{
        width: "500px",
        height: "220px",
        padding: "10px",
      }}
    >
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default BarChart;
