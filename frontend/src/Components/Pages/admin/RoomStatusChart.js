import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const RoomStatusChart = () => {
  const [data, setData] = useState({ labels: [], counts: [] });

  useEffect(() => {
    axios.get("http://localhost:5000/api/analytics/room-status").then((res) => {
      setData({
        labels: res.data.map((d) => d._id),
        counts: res.data.map((d) => d.count),
      });
    });
  }, []);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Rooms",
        data: data.counts,
        backgroundColor: [
          "#60a5fa", "#f87171", "#facc15", "#34d399", "#a78bfa", "#fbbf24",
        ],
        borderWidth: 1,
      },
    ],
  };

 return (
  <div className="bg-white rounded-xl shadow-md p-4 w-full h-[320px] flex flex-col items-center justify-between">
    <h2 className="text-md font-semibold text-gray-700 mb-2 text-center">
      Room Status Overview
    </h2>
    <div className="w-[15px] h-[5px]">
      <Pie data={chartData} />
    </div>
  </div>
);

};

export default RoomStatusChart;
