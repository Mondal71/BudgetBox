import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, DollarSign, Calendar, FileText, AlertCircle } from "lucide-react";
import { addTransaction, TRANSACTION_CATEGORIES } from "../../services/transactionService";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function TransactionModal({ isOpen, onClose, type = "expense" }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: type,
    category: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes or type changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        type: type,
        category: "",
        amount: "",
        description: "",
        date: new Date().toISOString().split('T')[0]
      });
      setErrors({});
    }
  }, [isOpen, type]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Please enter a description";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date)
      };

      await addTransaction(transactionData, user.uid);
      
      toast.success(`${type === 'income' ? 'Income' : 'Expense'} added successfully!`);
      onClose();
    } catch (error) {
      toast.error("Failed to add transaction. Please try again.");
      console.error("Error adding transaction:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Get categories based on transaction type
  const categories = TRANSACTION_CATEGORIES[type] || [];

  // Format amount input
  const formatAmount = (value) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, '');
    // Ensure only one decimal point
    const parts = numericValue.split('.');
    if (parts.length > 2) return parts[0] + '.' + parts.slice(1).join('');
    return numericValue;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-t-3xl">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl shadow-lg ${
                type === 'income' ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-red-400 to-red-600'
              }`}>
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Add {type === 'income' ? 'Income' : 'Expense'}
                </h2>
                <p className="text-sm text-gray-500">
                  {type === 'income' ? 'Record your income source' : 'Track your spending'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Category
              </label>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleInputChange('category', category.name)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                      formData.category === category.name
                        ? 'border-[#66b2a3] bg-gradient-to-br from-[#66b2a3] to-[#549e90] bg-opacity-10 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    } ${errors.category ? 'border-red-300 bg-red-50' : ''}`}
                  >
                    <div className="text-3xl mb-3">{category.icon}</div>
                    <div className="text-sm font-semibold text-gray-800">
                      {category.name}
                    </div>
                  </button>
                ))}
              </div>
              {errors.category && (
                <div className="flex items-center gap-2 mt-3 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {errors.category}
                </div>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Amount (₹)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', formatAmount(e.target.value))}
                  placeholder="0.00"
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#66b2a3] focus:border-[#66b2a3] text-lg font-medium ${
                    errors.amount ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                <DollarSign className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              </div>
              {errors.amount && (
                <div className="flex items-center gap-2 mt-3 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {errors.amount}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Description
              </label>
              <div className="relative">
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter description..."
                  rows="3"
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#66b2a3] focus:border-[#66b2a3] resize-none text-base ${
                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                <FileText className="absolute right-4 top-4 w-6 h-6 text-gray-400" />
              </div>
              {errors.description && (
                <div className="flex items-center gap-2 mt-3 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description}
                </div>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#66b2a3] focus:border-[#66b2a3] text-base ${
                    errors.date ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              </div>
              {errors.date && (
                <div className="flex items-center gap-2 mt-3 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {errors.date}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-[#66b2a3] to-[#549e90] text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding...
                  </div>
                ) : (
                  `Add ${type === 'income' ? 'Income' : 'Expense'}`
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 