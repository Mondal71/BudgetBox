import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function BillsWidget() {
  const [bills, setBills] = useState([]);

  // Mock data - in real app this would come from Firestore
  useEffect(() => {
    setBills([
      {
        id: 1,
        name: "Electricity Bill",
        amount: 2500,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        status: "pending",
        category: "Utilities"
      },
      {
        id: 2,
        name: "Internet Bill",
        amount: 1200,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        status: "pending",
        category: "Utilities"
      },
      {
        id: 3,
        name: "Credit Card",
        amount: 8500,
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day overdue
        status: "overdue",
        category: "Credit"
      },
      {
        id: 4,
        name: "Rent",
        amount: 15000,
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        status: "pending",
        category: "Housing"
      }
    ]);
  }, []);

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusIcon = (status, daysUntilDue) => {
    if (status === "overdue" || daysUntilDue < 0) {
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    } else if (daysUntilDue <= 3) {
      return <Clock className="w-4 h-4 text-orange-500" />;
    } else {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getStatusColor = (status, daysUntilDue) => {
    if (status === "overdue" || daysUntilDue < 0) {
      return "text-red-600 bg-red-50";
    } else if (daysUntilDue <= 3) {
      return "text-orange-600 bg-orange-50";
    } else {
      return "text-green-600 bg-green-50";
    }
  };

  const totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const overdueBills = bills.filter(bill => getDaysUntilDue(bill.dueDate) < 0);
  const upcomingBills = bills.filter(bill => getDaysUntilDue(bill.dueDate) >= 0 && getDaysUntilDue(bill.dueDate) <= 7);

  return (
    <motion.div
      id="bills-widget"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 rounded-xl shadow-md hover:shadow-lg border bg-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Upcoming Bills</h3>
        </div>
        <div className="text-sm text-gray-500">
          {bills.length} bills
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-lg font-bold text-gray-900">
            ₹{totalBills.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Total Due</div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="text-lg font-bold text-red-600">
            {overdueBills.length}
          </div>
          <div className="text-xs text-red-500">Overdue</div>
        </div>
      </div>

      {/* Bills List */}
      <div className="space-y-3">
        {bills.slice(0, 4).map((bill) => {
          const daysUntilDue = getDaysUntilDue(bill.dueDate);
          const statusColor = getStatusColor(bill.status, daysUntilDue);
          
          return (
            <motion.div
              key={bill.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(bill.status, daysUntilDue)}
                <div>
                  <div className="font-medium text-gray-800">{bill.name}</div>
                  <div className="text-xs text-gray-500">{bill.category}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  ₹{bill.amount.toLocaleString()}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
                  {daysUntilDue < 0 
                    ? `${Math.abs(daysUntilDue)} days overdue`
                    : daysUntilDue === 0 
                    ? "Due today"
                    : `${daysUntilDue} days left`
                  }
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View All Button */}
      {bills.length > 4 && (
        <button className="w-full mt-4 py-2 text-sm text-[#66b2a3] hover:bg-[#66b2a3] hover:text-white rounded-lg transition-colors">
          View All Bills ({bills.length})
        </button>
      )}
    </motion.div>
  );
} 