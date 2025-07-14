import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { getBills, calculateTotalBillsDue, getDaysUntilDue } from "../../services/billService";
import { useAuth } from "../../context/AuthContext";

export default function BillsWidget() {
  const { user } = useAuth();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get real bill data
  useEffect(() => {
    if (!user) return;

    const unsubscribe = getBills(user.uid, (data) => {
      setBills(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

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

  // Helper function to get days until due for any date format
  const getDaysUntilDueForBill = (dueDate) => {
    let billDate;
    if (dueDate?.toDate) {
      billDate = dueDate.toDate(); // Firestore Timestamp
    } else if (dueDate instanceof Date) {
      billDate = dueDate; // Regular Date
    } else {
      billDate = new Date(dueDate); // String or other format
    }
    
    const today = new Date();
    const diffTime = billDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalBills = calculateTotalBillsDue(bills);
  const overdueBills = bills.filter(bill => {
    const daysUntilDue = getDaysUntilDueForBill(bill.dueDate);
    return daysUntilDue < 0 && bill.status === 'pending';
  });
  const upcomingBills = bills.filter(bill => {
    const daysUntilDue = getDaysUntilDueForBill(bill.dueDate);
    return daysUntilDue >= 0 && daysUntilDue <= 7 && bill.status === 'pending';
  });

  if (loading) {
    return (
      <motion.div
        id="bills-widget"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full p-6 rounded-xl shadow-md hover:shadow-lg border bg-white flex flex-col"
      >
        <div className="animate-pulse flex-1">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      id="bills-widget"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full p-6 rounded-xl shadow-md hover:shadow-lg border bg-white flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Upcoming Bills</h3>
            <p className="text-sm text-gray-500">Payment tracking</p>
          </div>
        </div>
        <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
          {bills.length} bills
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl">
          <div className="text-xl font-bold text-gray-900">
            ₹{totalBills.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Total Due</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl">
          <div className="text-xl font-bold text-red-600">
            {overdueBills.length}
          </div>
          <div className="text-xs text-red-500">Overdue</div>
        </div>
      </div>

      {/* Bills List */}
      <div className="flex-1">
        {bills.length > 0 ? (
          <div className="space-y-3">
            {bills
              .filter(bill => bill.status === 'pending')
              .slice(0, 4)
              .map((bill) => {
                const daysUntilDue = getDaysUntilDueForBill(bill.dueDate);
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
        ) : (
          <div className="text-center py-8 flex-1 flex flex-col justify-center">
            <div className="text-gray-400 mb-2 text-4xl">📄</div>
            <p className="text-gray-500 text-sm mb-1">No bills yet</p>
            <p className="text-gray-400 text-xs">Add your first bill to start tracking</p>
          </div>
        )}
      </div>

      {/* View All Button */}
      {bills.filter(bill => bill.status === 'pending').length > 4 && (
        <button className="w-full mt-4 py-3 text-sm bg-gradient-to-r from-[#66b2a3] to-[#549e90] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
          View All Bills ({bills.filter(bill => bill.status === 'pending').length})
        </button>
      )}
    </motion.div>
  );
} 