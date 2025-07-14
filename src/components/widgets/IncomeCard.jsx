import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Calendar } from "lucide-react";

export default function IncomeCard() {
  const [incomeData, setIncomeData] = useState({
    totalIncome: 0,
    thisMonth: 0,
    lastMonth: 0,
    upcoming: 0
  });

  // Mock data - in real app this would come from Firestore
  useEffect(() => {
    setIncomeData({
      totalIncome: 125000,
      thisMonth: 45000,
      lastMonth: 42000,
      upcoming: 15000
    });
  }, []);

  const percentageChange = ((incomeData.thisMonth - incomeData.lastMonth) / incomeData.lastMonth * 100).toFixed(1);

  return (
    <motion.div
      id="income-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 rounded-xl shadow-md hover:shadow-lg border bg-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Income Overview</h3>
        </div>
        <TrendingUp className="w-5 h-5 text-green-500" />
      </div>

      {/* Main Income Display */}
      <div className="mb-6">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          ₹{incomeData.totalIncome.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">Total Income</div>
      </div>

      {/* Monthly Comparison */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">This Month</span>
          <span className="font-semibold text-gray-800">
            ₹{incomeData.thisMonth.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Last Month</span>
          <span className="font-semibold text-gray-800">
            ₹{incomeData.lastMonth.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Change</span>
          <span className={`font-semibold ${percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {percentageChange >= 0 ? '+' : ''}{percentageChange}%
          </span>
        </div>
      </div>

      {/* Upcoming Income */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Upcoming</span>
        </div>
        <div className="text-lg font-bold text-blue-900">
          ₹{incomeData.upcoming.toLocaleString()}
        </div>
        <div className="text-xs text-blue-600">Expected this week</div>
      </div>
    </motion.div>
  );
} 