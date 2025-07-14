import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../layout/DashboardLayout";
import BillModal from "../components/modals/BillModal";
import { CreditCard, Plus, AlertTriangle, CheckCircle, Clock, Search } from "lucide-react";
import { getBills, calculateTotalBillsDue, getDaysUntilDue } from "../services/billService";

export default function Bills() {
  const { user } = useAuth();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBillModal, setShowBillModal] = useState(false);
  const [filter, setFilter] = useState("all"); // all, pending, overdue, paid

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

  const filteredBills = bills.filter(bill => {
    if (filter === "all") return true;
    if (filter === "pending") return bill.status === "pending";
    if (filter === "overdue") {
      const daysUntilDue = getDaysUntilDueForBill(bill.dueDate);
      return daysUntilDue < 0 && bill.status === "pending";
    }
    if (filter === "paid") return bill.status === "paid";
    return true;
  });

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
                Bills 💳
              </h1>
              <p className="text-xl opacity-90">
                Manage your recurring payments
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-0">
              <button
                onClick={() => setShowBillModal(true)}
                className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-xl hover:bg-white hover:text-[#66b2a3] transition-all duration-300 font-medium border border-white border-opacity-30"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Add Bill
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Cards */}
      <section className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Due</p>
                <p className="text-2xl font-bold text-gray-800">₹{totalBills.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{overdueBills.length}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Upcoming</p>
                <p className="text-2xl font-bold text-orange-600">{upcomingBills.length}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Bills</p>
                <p className="text-2xl font-bold text-gray-800">{bills.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-800">Filter Bills</h2>
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
                  onClick={() => setFilter("pending")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === "pending" 
                      ? "bg-orange-500 text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter("overdue")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === "overdue" 
                      ? "bg-red-500 text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Overdue
                </button>
                <button
                  onClick={() => setFilter("paid")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === "paid" 
                      ? "bg-green-500 text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Paid
                </button>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search bills..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66b2a3] focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bills List */}
      <section className="bg-white py-8 px-6 rounded-3xl shadow-lg border border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66b2a3] mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading bills...</p>
            </div>
          ) : filteredBills.length > 0 ? (
            <div className="space-y-4">
              {filteredBills.map((bill) => {
                const daysUntilDue = getDaysUntilDueForBill(bill.dueDate);
                const statusColor = getStatusColor(bill.status, daysUntilDue);
                
                return (
                  <motion.div
                    key={bill.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-6 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(bill.status, daysUntilDue)}
                      <div>
                        <div className="font-semibold text-gray-800 text-lg">{bill.name}</div>
                        <div className="text-sm text-gray-500">{bill.category}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          Due: {bill.dueDate?.toDate ? bill.dueDate.toDate().toLocaleDateString() : new Date(bill.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 text-lg">
                        ₹{bill.amount.toLocaleString()}
                      </div>
                      <div className={`text-xs px-3 py-1 rounded-full ${statusColor} font-medium`}>
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
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4 text-6xl">📄</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No bills found</h3>
              <p className="text-gray-500 mb-6">
                {filter === "all" 
                  ? "You haven't added any bills yet. Get started by adding your first bill!"
                  : `No ${filter} bills found.`
                }
              </p>
              {filter === "all" && (
                <button
                  onClick={() => setShowBillModal(true)}
                  className="px-6 py-3 bg-[#66b2a3] text-white rounded-xl hover:bg-[#549e90] transition-colors font-medium"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Your First Bill
                </button>
              )}
            </div>
          )}
        </motion.div>
      </section>

      {/* Modal */}
      <BillModal 
        isOpen={showBillModal} 
        onClose={() => setShowBillModal(false)} 
      />
    </DashboardLayout>
  );
} 