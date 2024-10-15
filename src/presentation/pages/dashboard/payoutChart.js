import { Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import React from "react";
import { Bar } from "react-chartjs-2";
const option = {
  responsive: true,
  plugins: {
    legend: { position: "chartArea" },
    title: {
      display: true,
      // text: "Modular Bar Chart",
    },
  },
};
const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Loaded Amount",
      data: [100, 30, 40, 50, 60, 100, 20, 30, 40, 50, 60, 70],
      backgroundColor: "#8D9CDB",
    },
    {
      label: "Disbursement",
      data: [15, 20, 25, 40, 45, 60, 20, 30, 40, 50, 60, 70],
      backgroundColor: "#FFDEA0",
    },
  ],
};
export default function PayOutChart() {
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <Bar options={option} data={data} />
    </div>
  );
}
