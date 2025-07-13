import { motion } from "framer-motion";
import Navbar from "../components/navBar/Navbar";
import Footer from "../components/footer/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <section className="bg-[#66b2a3] py-20 px-4 md:px-10 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold mb-6"
          >
            About BudgetBox
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-lg max-w-3xl mx-auto"
          >
            BudgetBox is your all-in-one solution for managing personal
            finances. Our mission is to simplify money tracking and help users
            take control of their income, expenses, savings, and bills. Whether
            you're saving for a goal or trying to stay on top of your monthly
            budget, BudgetBox empowers you with insights and tools that make
            money management effortless.
          </motion.p>
        </div>
      </section>

      <section className="bg-white py-20 px-4 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 rounded-xl shadow hover:shadow-lg transition border"
          >
            <h3 className="text-xl font-semibold mb-2 text-[#66b2a3]">
              Smart Budgeting
            </h3>
            <p className="text-gray-600">
              Create budgets, monitor progress, and receive alerts when you're
              close to exceeding limits.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-xl shadow hover:shadow-lg transition border"
          >
            <h3 className="text-xl font-semibold mb-2 text-[#66b2a3]">
              Easy Tracking
            </h3>
            <p className="text-gray-600">
              Track income, expenses, and bills with clean visuals and intuitive
              workflows.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-xl shadow hover:shadow-lg transition border"
          >
            <h3 className="text-xl font-semibold mb-2 text-[#66b2a3]">
              Real-Time Insights
            </h3>
            <p className="text-gray-600">
              Analyze trends, set goals, and make informed financial decisions
              using our dashboard.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
