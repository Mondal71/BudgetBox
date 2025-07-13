import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import Navbar from "../components/navBar/Navbar";
import Footer from "../components/footer/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in!");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid credentials.");
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-[80vh] bg-[#66b2a3] flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-[#66b2a3] mb-6">
            Login to BudgetBox
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66b2a3]"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66b2a3]"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#66b2a3] text-white font-semibold rounded-lg hover:bg-[#549e90] transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-[#66b2a3] hover:underline font-medium"
            >
              Sign up
            </a>
          </p>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
