// src/components/Sidebar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, FileText, Info, LogOut, TrendingUp, CreditCard } from "lucide-react";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const navItem = "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors";
  const activeNavItem = "flex items-center gap-3 px-4 py-3 rounded-lg bg-[#66b2a3] text-white font-medium";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <aside className="bg-white w-64 h-full shadow-lg p-6 hidden md:block">
      {/* Logo */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#66b2a3]">BudgetBox</h2>
        <p className="text-sm text-gray-500 mt-1">Financial Management</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <Link
          to="/dashboard"
          className={pathname === "/dashboard" ? activeNavItem : navItem}
        >
          <Home className="w-5 h-5" />
          Dashboard
        </Link>
        
        <Link
          to="/transactions"
          className={pathname === "/transactions" ? activeNavItem : navItem}
        >
          <TrendingUp className="w-5 h-5" />
          Transactions
        </Link>
        
        <Link
          to="/bills"
          className={pathname === "/bills" ? activeNavItem : navItem}
        >
          <CreditCard className="w-5 h-5" />
          Bills
        </Link>
        
        <Link
          to="/about"
          className={pathname === "/about" ? activeNavItem : navItem}
        >
          <Info className="w-5 h-5" />
          About
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-8 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
