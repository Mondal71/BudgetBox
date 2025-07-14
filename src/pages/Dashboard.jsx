// src/pages/Dashboard.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import DashboardLayout from "../layout/DashboardLayout";
import Tour from "../components/Tour";
import WidgetsGrid from "../components/WidgetsGrid";
import TransactionsList from "../components/TransactionsList";
import { TrendingUp, DollarSign, Calendar, Target, RotateCcw } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();

  /* ───────── Tour control ───────── */
  const [runTour, setRunTour] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("tourSeen")) setRunTour(true);
  }, []);

  /* ───────── Handlers ───────── */
  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully");
  };

  const handleRestartTour = () => {
    localStorage.removeItem("tourSeen");
    setRunTour(true);
    toast.success("Tour restarted! Follow the guide to explore features.");
  };

  const handleResetLayout = () => {
    localStorage.removeItem("dashboard-layout");
    window.location.reload();
    toast.success("Dashboard layout reset to default!");
  };

  return (
    <DashboardLayout>
      {/* Guided on‑boarding tour */}
      <Tour run={runTour} setRun={setRunTour} />

      {/* Welcome header */}
      <section className="bg-gradient-to-r from-[#66b2a3] via-[#549e90] to-[#4a8a7c] text-white py-10 px-6 md:px-10 rounded-3xl shadow-xl mb-8 relative overflow-hidden max-w-7xl mx-auto">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-12 -translate-x-12"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left mb-0">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-lg opacity-90 mb-4">
                {user ? `Ready to manage your finances, ${user.email.split('@')[0]}?` : "Loading your dashboard..."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <button
                  onClick={handleRestartTour}
                  className="px-5 py-2 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-xl hover:bg-white hover:text-[#66b2a3] transition-all duration-300 font-medium border border-white border-opacity-30 hover:shadow-lg"
                >
                  <Target className="w-4 h-4 inline mr-2" />
                  Take Tour
                </button>
                <button
                  onClick={handleResetLayout}
                  className="px-5 py-2 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-xl hover:bg-white hover:text-[#66b2a3] transition-all duration-300 font-medium border border-white border-opacity-30 hover:shadow-lg"
                >
                  <RotateCcw className="w-4 h-4 inline mr-2" />
                  Reset Layout
                </button>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-white text-[#66b2a3] rounded-xl hover:bg-gray-100 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quick Stats */}
      <section className="mb-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex items-center gap-4">
            <div className="p-3 bg-green-400 rounded-xl">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Balance</p>
              <p className="text-2xl font-bold text-gray-800">₹0</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex items-center gap-4">
            <div className="p-3 bg-blue-400 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Monthly Income</p>
              <p className="text-2xl font-bold text-gray-800">₹0</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-100 to-red-50 p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex items-center gap-4">
            <div className="p-3 bg-red-400 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Monthly Expenses</p>
              <p className="text-2xl font-bold text-gray-800">₹0</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex items-center gap-4">
            <div className="p-3 bg-purple-400 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Savings Rate</p>
              <p className="text-2xl font-bold text-gray-800">0%</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Draggable / resizable widgets */}
      <section className="bg-white py-8 px-6 rounded-3xl shadow-lg border border-gray-100 mb-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          <WidgetsGrid />
        </motion.div>
      </section>

      {/* Recent transactions feed */}
      <section className="bg-white py-8 px-6 rounded-3xl shadow-lg border border-gray-100 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Recent Transactions
            </h2>
            <button className="px-4 py-2 bg-[#66b2a3] text-white rounded-lg hover:bg-[#549e90] transition-colors text-sm font-medium">
              View All
            </button>
          </div>
          <TransactionsList />
        </motion.div>
      </section>
    </DashboardLayout>
  );
}
