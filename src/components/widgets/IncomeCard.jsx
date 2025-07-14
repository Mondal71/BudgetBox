import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Calendar } from "lucide-react";
import { getTransactions, calculateTotal } from "../../services/transactionService";
import { useAuth } from "../../context/AuthContext";

export default function IncomeCard() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get real transaction data
  useEffect(() => {
    if (!user) return;

    const unsubscribe = getTransactions(user.uid, (data) => {
      setTransactions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Calculate income data
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const currentMonthTransactions = transactions.filter(t => {
    // Handle both Firestore Timestamp and regular Date objects
    let transactionDate;
    if (t.date?.toDate) {
      transactionDate = t.date.toDate(); // Firestore Timestamp
    } else if (t.date instanceof Date) {
      transactionDate = t.date; // Regular Date
    } else {
      transactionDate = new Date(t.date); // String or other format
    }
    
    return transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear &&
           t.type === 'income';
  });

  const lastMonthTransactions = transactions.filter(t => {
    // Handle both Firestore Timestamp and regular Date objects
    let transactionDate;
    if (t.date?.toDate) {
      transactionDate = t.date.toDate(); // Firestore Timestamp
    } else if (t.date instanceof Date) {
      transactionDate = t.date; // Regular Date
    } else {
      transactionDate = new Date(t.date); // String or other format
    }
    
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    return transactionDate.getMonth() === lastMonth && 
           transactionDate.getFullYear() === lastMonthYear &&
           t.type === 'income';
  });

  const totalIncome = calculateTotal(transactions, 'income');
  const thisMonthIncome = calculateTotal(currentMonthTransactions, 'income');
  const lastMonthIncome = calculateTotal(lastMonthTransactions, 'income');
  const upcomingIncome = 0; // This would be calculated from scheduled income

  const percentageChange = lastMonthIncome > 0 
    ? ((thisMonthIncome - lastMonthIncome) / lastMonthIncome * 100).toFixed(1)
    : 0;

  if (loading) {
    return (
      <motion.div
        id="income-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full p-6 rounded-xl shadow-md hover:shadow-lg border bg-white flex flex-col"
      >
        <div className="animate-pulse flex-1">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      id="income-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full p-6 rounded-xl shadow-md hover:shadow-lg border bg-white flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Income Overview</h3>
            <p className="text-sm text-gray-500">Financial growth</p>
          </div>
        </div>
        <div className="p-2 bg-green-100 rounded-lg">
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>
      </div>

      {/* Main Income Display */}
      <div className="mb-6 flex-1">
        <div className="text-3xl font-bold text-gray-900 mb-2">
          ₹{totalIncome.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500 mb-4">Total Income</div>

        {/* Monthly Comparison */}
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">This Month</span>
            <span className="font-semibold text-gray-800">
              ₹{thisMonthIncome.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Last Month</span>
            <span className="font-semibold text-gray-800">
              ₹{lastMonthIncome.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Change</span>
            <span className={`font-semibold ${percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {percentageChange >= 0 ? '+' : ''}{percentageChange}%
            </span>
          </div>
        </div>
      </div>

      {/* Upcoming Income */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">Upcoming</span>
        </div>
        <div className="text-lg font-bold">
          ₹{upcomingIncome.toLocaleString()}
        </div>
        <div className="text-xs opacity-90">Expected this week</div>
      </div>
    </motion.div>
  );
} 