import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed"],
    datasets: [
      {
        label: "Weekdays",
        data: [30, 18, 98],
        borderColor: "yellow",
        backgroundColor: ["green", "red", "yellow"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-4/5 w-4/5 bg-[#1f1f1f] rounded-xl p-5 flex justify-center items-center">
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
