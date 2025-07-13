import { motion } from "framer-motion";
import Navbar from "../components/navBar/Navbar";
import Footer from "../components/footer/Footer";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <>
      <Navbar />

      <section className="bg-[#66b2a3] text-white py-20 px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-4xl font-extrabold mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-lg">
            {user ? `Logged in as ${user.email}` : "Fetching user..."}
          </p>

          {/* tiny logout link */}
          {user && (
            <button
              onClick={() => {
                logout();
                toast.info("Logged out");
              }}
              className="mt-4 px-4 py-2 bg-white text-[#66b2a3] rounded-md hover:bg-gray-100 font-medium"
            >
              Logout
            </button>
          )}
        </motion.div>
      </section>

      {/* existing cards unchanged… */}
      {/* .... */}
      <Footer />
    </>
  );
}
