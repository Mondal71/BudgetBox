// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navItem =
    "block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 font-medium";

  return (
    <aside className="bg-white w-64 h-full shadow-md p-6 hidden md:block">
      <h2 className="text-2xl font-bold text-[#66b2a3] mb-8">BudgetBox</h2>
      <nav className="space-y-2">
        <Link
          to="/dashboard"
          className={`${navItem} ${pathname === "/dashboard" && "bg-gray-200"}`}
        >
          Dashboard
        </Link>
        <Link to="/bills" className={navItem}>
          Bills
        </Link>
        <Link to="/about" className={navItem}>
          About
        </Link>
        <Link to="/login" className={navItem}>
          Logout
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
