import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../layout/DashboardLayout";
import TransactionsList from "../components/TransactionsList";
import TransactionModal from "../components/modals/TransactionModal";
import { Plus, TrendingUp, TrendingDown, Filter, Search } from "lucide-react";

export default function Transactions() {
  const { user } = useAuth();
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [filter, setFilter] = useState("all"); // all, income, expense

  return (
    <DashboardLayout>
      {/* Header */}
      <section className="bg-gradient-to-r from-[#66b2a3] to-[#549e90] text-white py-12 px-6 md:px-10 rounded-3xl shadow-xl mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                Transactions 📊
              </h1>
              <p className="text-xl opacity-90">
                Track all your income and expenses
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-0">
              <button
                onClick={() => setShowIncomeModal(true)}
                className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-xl hover:bg-white hover:text-[#66b2a3] transition-all duration-300 font-medium border border-white border-opacity-30"
              >
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Add Income
              </button>
              <button
                onClick={() => setShowExpenseModal(true)}
                className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-xl hover:bg-white hover:text-[#66b2a3] transition-all duration-300 font-medium border border-white border-opacity-30"
              >
                <TrendingDown className="w-4 h-4 inline mr-2" />
                Add Expense
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-800">Filter Transactions</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === "all" 
                      ? "bg-[#66b2a3] text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("income")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === "income" 
                      ? "bg-green-500 text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Income
                </button>
                <button
                  onClick={() => setFilter("expense")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === "expense" 
                      ? "bg-red-500 text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Expenses
                </button>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66b2a3] focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Transactions List */}
      <section className="bg-white py-8 px-6 rounded-3xl shadow-lg border border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <TransactionsList filter={filter} />
        </motion.div>
      </section>

      {/* Modals */}
      <TransactionModal 
        isOpen={showIncomeModal} 
        onClose={() => setShowIncomeModal(false)} 
        type="income" 
      />
      <TransactionModal 
        isOpen={showExpenseModal} 
        onClose={() => setShowExpenseModal(false)} 
        type="expense" 
      />
    </DashboardLayout>
  );
} 