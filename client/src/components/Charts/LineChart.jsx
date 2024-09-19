import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekdays",
        data: [30, 18, 98, 43, 78, 12, 90],
        borderColor: "yellow",
        backgroundColor: "green",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="h-3/5 w-3/5 bg-[#1f1f1f] rounded-xl p-5 flex justify-center items-center">
      <Line data={data} />
    </div>
  );
};

export default LineChart;
