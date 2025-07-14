import { motion } from "framer-motion";
import { Plus, TrendingUp, TrendingDown, CreditCard, Calendar } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      id: 1,
      title: "Add Income",
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
      hoverColor: "hover:bg-green-200",
      description: "Record new income"
    },
    {
      id: 2,
      title: "Add Expense",
      icon: TrendingDown,
      color: "bg-red-100 text-red-600",
      hoverColor: "hover:bg-red-200",
      description: "Record new expense"
    },
    {
      id: 3,
      title: "Add Bill",
      icon: CreditCard,
      color: "bg-purple-100 text-purple-600",
      hoverColor: "hover:bg-purple-200",
      description: "Schedule a bill"
    },
    {
      id: 4,
      title: "Set Reminder",
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
      hoverColor: "hover:bg-blue-200",
      description: "Create payment reminder"
    }
  ];

  const handleActionClick = (action) => {
    // In real app, this would open modals or navigate to forms
    console.log(`Clicked: ${action.title}`);
    // You can add toast notifications here
  };

  return (
    <motion.div
      id="quick-actions"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 rounded-xl shadow-md hover:shadow-lg border bg-white"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-[#66b2a3] bg-opacity-10 rounded-lg">
          <Plus className="w-5 h-5 text-[#66b2a3]" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <motion.button
            key={action.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleActionClick(action)}
            className={`p-4 rounded-lg border border-gray-100 ${action.hoverColor} transition-all duration-200 group`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-3 rounded-lg mb-3 ${action.color} group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div className="font-medium text-gray-800 mb-1">
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
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Last transaction</span>
            <span className="text-gray-800 font-medium">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Bills due this week</span>
            <span className="text-red-600 font-medium">3 bills</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Monthly savings</span>
            <span className="text-green-600 font-medium">₹15,000</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 