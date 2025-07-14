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

// Bill categories with icons and colors
export const BILL_CATEGORIES = [
  { id: 'utilities', name: 'Utilities', icon: '⚡', color: '#F59E0B' },
  { id: 'rent', name: 'Rent', icon: '🏠', color: '#3B82F6' },
  { id: 'insurance', name: 'Insurance', icon: '🛡️', color: '#10B981' },
  { id: 'subscription', name: 'Subscriptions', icon: '📱', color: '#8B5CF6' },
  { id: 'credit_card', name: 'Credit Card', icon: '💳', color: '#EF4444' },
  { id: 'loan', name: 'Loan', icon: '🏦', color: '#6366F1' },
  { id: 'internet', name: 'Internet', icon: '🌐', color: '#06B6D4' },
  { id: 'phone', name: 'Phone', icon: '📞', color: '#EC4899' },
  { id: 'other_bill', name: 'Other Bill', icon: '📄', color: '#6B7280' }
];

// Bill frequency options
export const BILL_FREQUENCIES = [
  { id: 'weekly', name: 'Weekly', days: 7 },
  { id: 'biweekly', name: 'Bi-weekly', days: 14 },
  { id: 'monthly', name: 'Monthly', days: 30 },
  { id: 'quarterly', name: 'Quarterly', days: 90 },
  { id: 'yearly', name: 'Yearly', days: 365 },
  { id: 'one_time', name: 'One Time', days: 0 }
];

// Add a new bill
export const addBill = async (billData, userId) => {
  try {
    const bill = {
      ...billData,
      userId,
      status: 'pending',
      // Convert JavaScript Date to Firestore Timestamp
      dueDate: billData.dueDate instanceof Date 
        ? Timestamp.fromDate(billData.dueDate)
        : Timestamp.fromDate(new Date(billData.dueDate)),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, "bills"), bill);
    return { id: docRef.id, ...bill };
  } catch (error) {
    console.error("Error adding bill:", error);
    throw new Error("Failed to add bill");
  }
};

// Update an existing bill
export const updateBill = async (billId, updateData) => {
  try {
    const billRef = doc(db, "bills", billId);
    const updatePayload = {
      ...updateData,
      updatedAt: serverTimestamp()
    };

    // Convert dueDate if it exists
    if (updateData.dueDate) {
      updatePayload.dueDate = updateData.dueDate instanceof Date 
        ? Timestamp.fromDate(updateData.dueDate)
        : Timestamp.fromDate(new Date(updateData.dueDate));
    }

    await updateDoc(billRef, updatePayload);
    return { id: billId, ...updateData };
  } catch (error) {
    console.error("Error updating bill:", error);
    throw new Error("Failed to update bill");
  }
};

// Delete a bill
export const deleteBill = async (billId) => {
  try {
    await deleteDoc(doc(db, "bills", billId));
    return billId;
  } catch (error) {
    console.error("Error deleting bill:", error);
    throw new Error("Failed to delete bill");
  }
};

// Mark bill as paid
export const markBillAsPaid = async (billId) => {
  try {
    const billRef = doc(db, "bills", billId);
    await updateDoc(billRef, {
      status: 'paid',
      paidAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return billId;
  } catch (error) {
    console.error("Error marking bill as paid:", error);
    throw new Error("Failed to mark bill as paid");
  }
};

// Get all bills for a user (simplified query to avoid index issues)
export const getBills = (userId, callback) => {
  const q = query(
    collection(db, "bills"),
    where("userId", "==", userId)
  );

  return onSnapshot(q, (snapshot) => {
    const bills = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).sort((a, b) => {
      // Sort by due date ascending (earliest first)
      const dateA = a.dueDate?.toDate ? a.dueDate.toDate() : new Date(a.dueDate);
      const dateB = b.dueDate?.toDate ? b.dueDate.toDate() : new Date(b.dueDate);
      return dateA - dateB;
    });
    callback(bills);
  });
};

// Get bills by status
export const getBillsByStatus = (userId, status, callback) => {
  const q = query(
    collection(db, "bills"),
    where("userId", "==", userId),
    where("status", "==", status)
  );

  return onSnapshot(q, (snapshot) => {
    const bills = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).sort((a, b) => {
      const dateA = a.dueDate?.toDate ? a.dueDate.toDate() : new Date(a.dueDate);
      const dateB = b.dueDate?.toDate ? b.dueDate.toDate() : new Date(b.dueDate);
      return dateA - dateB;
    });
    callback(bills);
  });
};

// Calculate total bills due
export const calculateTotalBillsDue = (bills) => {
  return bills
    .filter(bill => bill.status === 'pending')
    .reduce((sum, bill) => sum + (bill.amount || 0), 0);
};

// Get bills by category
export const getBillsByCategory = (bills, category) => {
  return bills.filter(bill => bill.category === category);
};

// Check if bill is overdue
export const isBillOverdue = (dueDate) => {
  const today = new Date();
  const billDate = dueDate.toDate ? dueDate.toDate() : new Date(dueDate);
  return billDate < today;
};

// Get days until due
export const getDaysUntilDue = (dueDate) => {
  const today = new Date();
  const billDate = dueDate.toDate ? dueDate.toDate() : new Date(dueDate);
  const diffTime = billDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Generate next due date for recurring bills
export const getNextDueDate = (currentDueDate, frequency) => {
  const frequencyData = BILL_FREQUENCIES.find(f => f.id === frequency);
  if (!frequencyData || frequencyData.id === 'one_time') return null;

  const currentDate = currentDueDate.toDate ? currentDueDate.toDate() : new Date(currentDueDate);
  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + frequencyData.days);
  return nextDate;
}; 