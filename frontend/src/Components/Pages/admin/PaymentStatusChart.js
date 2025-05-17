import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart parts
ChartJS.register(ArcElement, Tooltip, Legend);

const PaymentStatusChart = () => {
  const [data, setData] = useState({ labels: [], counts: [] });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/analytics/payment-status")
      .then((res) => {
        setData({
          labels: res.data.map((d) => d._id),
          counts: res.data.map((d) => d.count),
        });
      })
      .catch((err) => {
        console.error("Error fetching payment status data:", err);
      });
  }, []);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Payments",
        data: data.counts,
        backgroundColor: ["#4ade80", "#f97316", "#ef4444", "#a5b4fc"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full h-[320px] flex flex-col items-center justify-between">
      <h2 className="text-md font-semibold text-gray-700 mb-2 text-center">
        Payment Status
      </h2>
      <div className="w-[180px] h-[180px]">
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default PaymentStatusChart;
