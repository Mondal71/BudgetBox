import IncomeCard from "./widgets/IncomeCard";
import ExpenseChart from "./widgets/ExpenseChart";
import BillsWidget from "./widgets/BillsWidget";
import QuickActions from "./widgets/QuickActions";

export default function WidgetsGrid() {
  // Reset layout handler (for future use, if needed)
  const handleReset = () => {
    localStorage.removeItem("dashboard-layout");
    window.location.reload();
  };

  return (
    <div className="w-full">
      {/* Layout Controls */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#66b2a3]">Dashboard Widgets</h2>
        <button
          onClick={handleReset}
          className="px-3 py-2 text-xs bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 shadow-sm transition-all"
        >
          Reset Layout
        </button>
      </div>

      {/* Fixed CSS Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-full"><IncomeCard /></div>
        <div className="h-full"><ExpenseChart /></div>
        <div className="h-full"><QuickActions /></div>
        <div className="h-full"><BillsWidget /></div>
      </div>
    </div>
  );
}
