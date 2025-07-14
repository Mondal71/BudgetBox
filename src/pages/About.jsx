import { motion } from "framer-motion";
import DashboardLayout from "../layout/DashboardLayout";

export default function About() {
  return (
    <DashboardLayout>
      <section className="bg-[#66b2a3] py-20 px-4 md:px-10 text-white rounded-2xl shadow-lg mb-8">
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

      <section className="bg-white py-12 px-4 md:px-10 rounded-2xl shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose BudgetBox?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3 text-[#66b2a3]">
                Smart Budgeting
              </h3>
              <p className="text-gray-600">
                Create budgets, monitor progress, and receive alerts when you're
                close to exceeding limits. Our intelligent system helps you stay
                on track with your financial goals.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-semibold mb-3 text-[#66b2a3]">
                Easy Tracking
              </h3>
              <p className="text-gray-600">
                Track income, expenses, and bills with clean visuals and intuitive
                workflows. Add transactions in seconds with our streamlined interface.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-3 text-[#66b2a3]">
                Real-Time Insights
              </h3>
              <p className="text-gray-600">
                Analyze trends, set goals, and make informed financial decisions
                using our comprehensive dashboard with real-time data visualization.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4 md:px-10 rounded-2xl mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-6 text-gray-800"
          >
            Features That Matter
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-left p-4"
            >
              <h4 className="font-semibold text-[#66b2a3] mb-2">✅ Customizable Dashboard</h4>
              <p className="text-gray-600 text-sm">Drag and resize widgets to match your workflow</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-left p-4"
            >
              <h4 className="font-semibold text-[#66b2a3] mb-2">✅ Bill Reminders</h4>
              <p className="text-gray-600 text-sm">Never miss a payment with smart notifications</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-left p-4"
            >
              <h4 className="font-semibold text-[#66b2a3] mb-2">✅ Expense Categories</h4>
              <p className="text-gray-600 text-sm">Organize spending with intuitive categories</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-left p-4"
            >
              <h4 className="font-semibold text-[#66b2a3] mb-2">✅ Data Security</h4>
              <p className="text-gray-600 text-sm">Your financial data is encrypted and secure</p>
            </motion.div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
