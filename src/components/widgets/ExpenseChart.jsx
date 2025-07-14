import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PieChart, TrendingDown, MoreHorizontal } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getTransactions, getCategoryTotals } from "../../services/transactionService";
import { useAuth } from "../../context/AuthContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart() {
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

  // Calculate expense data
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const categoryTotals = getCategoryTotals(transactions, 'expense');

  // Convert category totals to chart format
  const chartCategories = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    amount: amount,
    color: getCategoryColor(category)
  }));

  const chartData = {
    labels: chartCategories.map(cat => cat.name),
    datasets: [
      {
        data: chartCategories.map(cat => cat.amount),
        backgroundColor: chartCategories.map(cat => cat.color),
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const percentage = totalExpenses > 0 ? ((value / totalExpenses) * 100).toFixed(1) : 0;
            return `${label}: ₹${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Get color for category
  function getCategoryColor(category) {
    const colors = {
      'Food & Dining': '#FF6384',
      'Transportation': '#36A2EB',
      'Shopping': '#FFCE56',
      'Bills': '#4BC0C0',
      'Entertainment': '#9966FF',
      'Healthcare': '#FF9F40',
      'Education': '#FF6384',
      'Travel': '#C9CBCF',
      'Other Expense': '#4BC0C0'
    };
    return colors[category] || '#6B7280';
  }

  if (loading) {
    return (
      <motion.div
        id="expense-chart"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full p-6 rounded-xl shadow-md hover:shadow-lg border bg-white flex flex-col"
      >
        <div className="animate-pulse flex-1">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
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
      id="expense-chart"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full p-6 rounded-xl shadow-md hover:shadow-lg border bg-white flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-red-400 to-red-600 rounded-xl shadow-lg">
            <TrendingDown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Expense Breakdown</h3>
            <p className="text-sm text-gray-500">Spending analysis</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Total Expenses */}
      <div className="mb-6">
        <div className="text-3xl font-bold text-gray-900 mb-2">
          ₹{totalExpenses.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">Total Expenses This Month</div>
      </div>

      {/* Chart Container */}
      <div className="flex-1">
        {chartCategories.length > 0 ? (
          <>
            <div className="h-48 mb-6">
              <Pie data={chartData} options={chartOptions} />
            </div>

            {/* Category List */}
            <div className="space-y-3">
              {chartCategories.slice(0, 5).map((category, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-800">
                      ₹{category.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {totalExpenses > 0 ? ((category.amount / totalExpenses) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 flex-1 flex flex-col justify-center">
            <div className="text-gray-400 mb-2 text-4xl">📊</div>
            <p className="text-gray-500 text-sm mb-1">No expenses yet</p>
            <p className="text-gray-400 text-xs">Add your first expense to see the breakdown</p>
          </div>
        )}
      </div>
    </motion.div>
  );
} 