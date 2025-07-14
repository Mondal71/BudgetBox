import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PieChart, TrendingDown, MoreHorizontal } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart() {
  const [expenseData, setExpenseData] = useState({
    totalExpenses: 0,
    categories: []
  });

  // Mock data - in real app this would come from Firestore
  useEffect(() => {
    setExpenseData({
      totalExpenses: 85000,
      categories: [
        { name: 'Food & Dining', amount: 25000, color: '#FF6384' },
        { name: 'Transportation', amount: 15000, color: '#36A2EB' },
        { name: 'Shopping', amount: 20000, color: '#FFCE56' },
        { name: 'Bills', amount: 10000, color: '#4BC0C0' },
        { name: 'Entertainment', amount: 5000, color: '#9966FF' }
      ]
    });
  }, []);

  const chartData = {
    labels: expenseData.categories.map(cat => cat.name),
    datasets: [
      {
        data: expenseData.categories.map(cat => cat.amount),
        backgroundColor: expenseData.categories.map(cat => cat.color),
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
            const percentage = ((value / expenseData.totalExpenses) * 100).toFixed(1);
            return `${label}: ₹${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <motion.div
      id="expense-chart"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 rounded-xl shadow-md hover:shadow-lg border bg-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-100 rounded-lg">
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Expense Breakdown</h3>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Total Expenses */}
      <div className="mb-6">
        <div className="text-2xl font-bold text-gray-900 mb-1">
          ₹{expenseData.totalExpenses.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">Total Expenses This Month</div>
      </div>

      {/* Chart Container */}
      <div className="h-64 mb-6">
        <Pie data={chartData} options={chartOptions} />
      </div>

      {/* Category List */}
      <div className="space-y-3">
        {expenseData.categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
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
                {((category.amount / expenseData.totalExpenses) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
} 