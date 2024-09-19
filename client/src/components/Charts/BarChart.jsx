import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekdays",
        data: [30, 18, 98, 43, 89, 12, 90],
        borderColor: "blue",
        backgroundColor: ["green", "red"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-4/5 w-4/5 bg-[#1f1f1f] rounded-xl p-5 flex justify-center items-center">
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
