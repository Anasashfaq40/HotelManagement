import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

// Register required Chart.js components
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const DailyBookingsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const fetchData = async () => {
    try {
    const res = await axios.get("http://localhost:5000/api/analytics/daily-bookings");


      const labels = res.data.map((entry) => entry.date);
      const data = res.data.map((entry) => entry.count);

      setChartData({
        labels,
        datasets: [
          {
            label: "Daily Bookings",
            data,
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            tension: 0.4,
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
          },
        ],
      });
    } catch (err) {
      console.error("Failed to fetch chart data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 }, // remove decimals
      },
    },
  };

return (
  <div className="bg-white rounded shadow p-4" style={{ height: "340px", overflow: "hidden", position: "relative" }}>
    <h2 className="text-center text-lg font-semibold mb-3 text-gray-700">
      Daily Bookings (Last 7 Days)
    </h2>
    <div style={{ height: "270px" }}>
      <Line data={chartData} options={options} />
    </div>
  </div>
);

};

export default DailyBookingsChart;
