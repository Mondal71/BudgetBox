import useTransactions from "../hooks/useTransactions";

export default function TransactionsList() {
  const { transactions, loading } = useTransactions();

  if (loading) return <p className="text-center">Loading transactions...</p>;

  if (transactions.length === 0)
    return <p className="text-center text-gray-500">No transactions found.</p>;

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div key={tx.id} className="border p-4 rounded-lg shadow-sm">
          <div className="flex justify-between">
            <span className="font-semibold">{tx.category}</span>
            <span className="text-gray-600">₹ {tx.amount}</span>
          </div>
          <p className="text-sm text-gray-500">
            {tx.timestamp?.toDate().toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
