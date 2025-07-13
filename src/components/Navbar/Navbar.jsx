import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">BudgetBox</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/about" className="hover:text-blue-600">
          About
        </Link>
        <Link to="/login" className="hover:text-blue-600">
          Login
        </Link>
        <Link to="/register" className="hover:text-blue-600">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
