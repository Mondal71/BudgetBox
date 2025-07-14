import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, TrendingUp, TrendingDown, CreditCard, Calendar } from "lucide-react";
import TransactionModal from "../modals/TransactionModal";
import BillModal from "../modals/BillModal";

export default function QuickActions() {
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);

  const actions = [
    {
      id: 1,
      title: "Add Income",
      icon: TrendingUp,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      description: "Record new income",
      onClick: () => setShowIncomeModal(true)
    },
    {
      id: 2,
      title: "Add Expense",
      icon: TrendingDown,
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-100",
      description: "Record new expense",
      onClick: () => setShowExpenseModal(true)
    },
    {
      id: 3,
      title: "Add Bill",
      icon: CreditCard,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-100",
      description: "Schedule a bill",
      onClick: () => setShowBillModal(true)
    },
    {
      id: 4,
      title: "Set Reminder",
      icon: Calendar,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-100",
      description: "Create payment reminder",
      onClick: () => setShowBillModal(true)
    }
  ];

  return (
    <>
      <motion.div
        id="quick-actions"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full p-6 rounded-xl shadow-md hover:shadow-lg border bg-white flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-[#66b2a3] to-[#549e90] rounded-xl shadow-lg">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Quick Actions</h3>
            <p className="text-sm text-gray-500">Manage finances</p>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {actions.map((action) => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.onClick}
              className="group relative overflow-hidden rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 bg-white hover:shadow-lg"
            >
              <div className="p-4 flex flex-col items-center text-center h-full">
                <div className={`p-3 rounded-xl mb-3 bg-gradient-to-br ${action.color} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-semibold text-gray-800 mb-1">
                  {action.title}
                </div>
                <div className="text-xs text-gray-500">
                  {action.description}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Last transaction</span>
              <span className="text-sm text-gray-800 font-medium">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Bills due this week</span>
              <span className="text-sm text-red-600 font-medium">3 bills</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Monthly savings</span>
              <span className="text-sm text-green-600 font-medium">₹15,000</span>
            </div>
          </div>
        </div>
      </motion.div>

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
      <BillModal 
        isOpen={showBillModal} 
        onClose={() => setShowBillModal(false)} 
      />
    </>
  );
} 