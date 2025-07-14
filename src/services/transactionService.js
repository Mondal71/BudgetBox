import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  Timestamp 
} from "firebase/firestore";
import { db } from "../firebase";

// Transaction categories with icons and colors
export const TRANSACTION_CATEGORIES = {
  income: [
    { id: 'salary', name: 'Salary', icon: '💼', color: '#10B981' },
    { id: 'freelance', name: 'Freelance', icon: '💻', color: '#3B82F6' },
    { id: 'investment', name: 'Investment', icon: '📈', color: '#8B5CF6' },
    { id: 'business', name: 'Business', icon: '🏢', color: '#F59E0B' },
    { id: 'other_income', name: 'Other Income', icon: '💰', color: '#06B6D4' }
  ],
  expense: [
    { id: 'food', name: 'Food & Dining', icon: '🍽️', color: '#EF4444' },
    { id: 'transportation', name: 'Transportation', icon: '🚗', color: '#3B82F6' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#8B5CF6' },
    { id: 'bills', name: 'Bills', icon: '📄', color: '#F59E0B' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#EC4899' },
    { id: 'health', name: 'Healthcare', icon: '🏥', color: '#10B981' },
    { id: 'education', name: 'Education', icon: '📚', color: '#6366F1' },
    { id: 'travel', name: 'Travel', icon: '✈️', color: '#06B6D4' },
    { id: 'other_expense', name: 'Other Expense', icon: '💸', color: '#6B7280' }
  ]
};

// Add a new transaction
export const addTransaction = async (transactionData, userId) => {
  try {
    const transaction = {
      ...transactionData,
      userId,
      // Convert JavaScript Date to Firestore Timestamp
      date: transactionData.date instanceof Date 
        ? Timestamp.fromDate(transactionData.date)
        : Timestamp.fromDate(new Date(transactionData.date)),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, "transactions"), transaction);
    return { id: docRef.id, ...transaction };
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw new Error("Failed to add transaction");
  }
};

// Update an existing transaction
export const updateTransaction = async (transactionId, updateData) => {
  try {
    const transactionRef = doc(db, "transactions", transactionId);
    const updatePayload = {
      ...updateData,
      updatedAt: serverTimestamp()
    };

    // Convert date if it exists
    if (updateData.date) {
      updatePayload.date = updateData.date instanceof Date 
        ? Timestamp.fromDate(updateData.date)
        : Timestamp.fromDate(new Date(updateData.date));
    }

    await updateDoc(transactionRef, updatePayload);
    return { id: transactionId, ...updateData };
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw new Error("Failed to update transaction");
  }
};

// Delete a transaction
export const deleteTransaction = async (transactionId) => {
  try {
    await deleteDoc(doc(db, "transactions", transactionId));
    return transactionId;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw new Error("Failed to delete transaction");
  }
};

// Get all transactions for a user (simplified query to avoid index issues)
export const getTransactions = (userId, callback) => {
  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId)
  );

  return onSnapshot(q, (snapshot) => {
    const transactions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).sort((a, b) => {
      // Sort by date descending (most recent first)
      const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
      const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
      return dateB - dateA;
    });
    callback(transactions);
  });
};

// Get transactions by type (income/expense)
export const getTransactionsByType = (userId, type, callback) => {
  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId),
    where("type", "==", type)
  );

  return onSnapshot(q, (snapshot) => {
    const transactions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).sort((a, b) => {
      // Sort by date descending
      const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
      const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
      return dateB - dateA;
    });
    callback(transactions);
  });
};

// Calculate total income/expense for a period
export const calculateTotal = (transactions, type) => {
  return transactions
    .filter(t => t.type === type)
    .reduce((sum, t) => sum + (t.amount || 0), 0);
};

// Get category totals
export const getCategoryTotals = (transactions, type) => {
  const categoryTotals = {};
  
  transactions
    .filter(t => t.type === type)
    .forEach(t => {
      if (categoryTotals[t.category]) {
        categoryTotals[t.category] += t.amount || 0;
      } else {
        categoryTotals[t.category] = t.amount || 0;
      }
    });

  return categoryTotals;
}; 