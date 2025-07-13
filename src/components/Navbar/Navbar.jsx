import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-[#66b2a3] tracking-wide"
        >
          BudgetBox
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-[#66b2a3] font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-[#66b2a3] font-medium transition-colors"
          >
            About
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-[#66b2a3] text-[#66b2a3] hover:bg-[#66b2a3] hover:text-white font-medium transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-[#66b2a3] text-white hover:bg-[#549e90] font-medium transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Nav (optional for future) */}
        {/* Add a hamburger icon and dropdown here if needed */}
      </div>
    </nav>
  );
};

export default Navbar;
