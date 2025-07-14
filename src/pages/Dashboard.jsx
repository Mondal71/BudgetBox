// src/pages/Dashboard.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import DashboardLayout from "../layout/DashboardLayout";
import Tour from "../components/Tour";
import WidgetsGrid from "../components/WidgetsGrid";
import TransactionsList from "../components/TransactionsList";

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
    toast.info("Logged out");
  };

  const handleRestartTour = () => {
    localStorage.removeItem("tourSeen");
    setRunTour(true);
  };

  return (
    <DashboardLayout>
      {/* Guided on‑boarding tour */}
      <Tour run={runTour} setRun={setRunTour} />

      {/* Welcome header */}
      <section className="bg-[#66b2a3] text-white py-20 px-4 md:px-10 rounded-2xl shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-4xl font-extrabold mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-lg">
            {user ? `Logged in as ${user.email}` : "Fetching user..."}
          </p>

          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-white text-[#66b2a3] rounded-md hover:bg-gray-100 font-medium transition"
            >
              Logout
            </button>
            <button
              onClick={handleRestartTour}
              className="px-4 py-2 border border-white rounded-md text-white hover:text-yellow-200 hover:border-yellow-200 transition"
            >
              Restart Tour
            </button>
          </div>
        </motion.div>
      </section>

      {/* Draggable / resizable widgets */}
      <section className="bg-white py-20 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <WidgetsGrid />
        </div>
      </section>

      {/* Recent transactions feed */}
      <section className="bg-gray-100 py-12 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-[#66b2a3]">
            Recent Transactions
          </h2>
          <TransactionsList />
        </div>
      </section>
    </DashboardLayout>
  );
}
