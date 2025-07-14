import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home"; 
import About from "./pages/About"; 
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import Dashboard from "./pages/Dashboard"; 
import Transactions from "./pages/Transactions";
import Bills from "./pages/Bills";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/transactions"
      element={
        <ProtectedRoute>
          <Transactions />
        </ProtectedRoute>
      }
    />
    <Route
      path="/bills"
      element={
        <ProtectedRoute>
          <Bills />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
