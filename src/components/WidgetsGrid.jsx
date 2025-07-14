import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { motion } from "framer-motion";
import IncomeCard from "./widgets/IncomeCard";
import ExpenseChart from "./widgets/ExpenseChart";
import BillsWidget from "./widgets/BillsWidget";
import QuickActions from "./widgets/QuickActions";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function WidgetsGrid() {
  // Default layout configuration
  const defaultLayout = [
    { i: "income-card", x: 0, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
    { i: "expense-chart", x: 4, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
    { i: "bills-widget", x: 8, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
    { i: "quick-actions", x: 0, y: 2, w: 6, h: 2, minW: 4, minH: 2 }
  ];

  // Load saved layout from localStorage or use default
  const [layout, setLayout] = useState(() => {
    const savedLayout = localStorage.getItem("dashboard-layout");
    return savedLayout ? JSON.parse(savedLayout) : defaultLayout;
  });

  // Save layout to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("dashboard-layout", JSON.stringify(layout));
  }, [layout]);

  // Handle layout changes
  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  // Reset layout to default
  const resetLayout = () => {
    setLayout(defaultLayout);
    localStorage.removeItem("dashboard-layout");
  };

  return (
    <div className="w-full">
      {/* Layout Controls */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#66b2a3]">Dashboard Widgets</h2>
        <button
          onClick={resetLayout}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Reset Layout
        </button>
      </div>

      {/* Grid Layout */}
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={200}
        onLayoutChange={onLayoutChange}
        isDraggable={true}
        isResizable={true}
        margin={[20, 20]}
        containerPadding={[0, 0]}
        useCSSTransforms={true}
        preventCollision={false}
        compactType="vertical"
      >
        {/* Income Card Widget */}
        <div key="income-card">
          <IncomeCard />
        </div>

        {/* Expense Chart Widget */}
        <div key="expense-chart">
          <ExpenseChart />
        </div>

        {/* Bills Widget */}
        <div key="bills-widget">
          <BillsWidget />
        </div>

        {/* Quick Actions Widget */}
        <div key="quick-actions">
          <QuickActions />
        </div>
      </ResponsiveGridLayout>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-2">💡 Widget Tips</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Drag widgets to rearrange them on your dashboard</li>
          <li>• Resize widgets by dragging the bottom-right corner</li>
          <li>• Your layout is automatically saved and will persist between sessions</li>
          <li>• Use the "Reset Layout" button to restore the default arrangement</li>
        </ul>
      </div>
    </div>
  );
}
