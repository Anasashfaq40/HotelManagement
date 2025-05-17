import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DailyBookingsChart from "./DailyBookingsChart";
import RoomStatusChart from "./RoomStatusChart";
import PaymentStatusChart from "./PaymentStatusChart";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-app bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="rec-dashboard-content flex">
        <Sidebar isOpen={isSidebarOpen} />

        <main
          className={`rec-dashboard-dashboard-content flex-1 transition-all duration-300 p-6 ${
            isSidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          {/* Page Header */}
          <div className="bg-white shadow rounded-xl px-6 py-5 mb-6">
            <h1 className="text-2xl font-bold text-gray-700 mb-1">
              Welcome to the Hotel Management System Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Overview of your current operations and performance
            </p>
          </div>

          {/* Daily Bookings Chart - full width */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <DailyBookingsChart />
          </div>

          {/* Stacked Pie Charts in one centered column */}
          <div className="flex justify-center">
            <div className="flex flex-col gap-6 w-full max-w-sm">
              <RoomStatusChart />
              <PaymentStatusChart />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
