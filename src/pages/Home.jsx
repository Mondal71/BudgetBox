import { motion } from "framer-motion";
import heroImage from "../assets/hero.png";
import Navbar from "../components/navBar/Navbar";
import Footer from "../components/footer/Footer";

const features = [
  {
    title: "Digital Tracking",
    desc: "Monitor income, expenses, and savings digitally with ease.",
    icon: () => (
      <img
        src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
        alt="Phone Money"
        className="w-12 h-12 transition-transform duration-300 hover:scale-110"
      />
    ),
  },
  {
    title: "Smart Budgeting",
    desc: "Set your budget goals and stick to them using visual guidance.",
    icon: () => (
      <img
        src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
        alt="Wallet"
        className="w-12 h-12 transition-transform duration-300 hover:scale-110"
      />
    ),
  },
  {
    title: "Expense Insights",
    desc: "Visual reports help you understand where your money goes.",
    icon: () => (
      <img
        src="https://cdn-icons-png.flaticon.com/512/2166/2166826.png"
        alt="Calculator"
        className="w-12 h-12 transition-transform duration-300 hover:scale-110"
      />
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ─── Hero ────────────────────────────────────────────── */}
      <section className="w-full px-4 md:px-10 py-20 bg-[#66b2a3] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          {/* Text */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-white lg:w-1/2 w-full"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Financial <span className="text-yellow-300">Management</span>
            </h1>
            <p className="text-lg lg:text-xl mb-10">
              Organize your income, expenses, bills, and budgets — all in one
              colorful dashboard.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="/register"
                className="px-6 py-3 rounded-lg text-[#66b2a3] font-medium bg-yellow-300 hover:bg-yellow-400 active:scale-95 transition-shadow shadow-lg"
              >
                Get Started
              </a>
              <a
                href="/about"
                className="px-6 py-3 rounded-lg border border-white text-white font-medium bg-transparent hover:bg-white hover:text-[#66b2a3] active:scale-95 transition"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 w-full flex justify-center"
          >
            <img
              src={heroImage}
              alt="Financial Management Graphic"
              className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto drop-shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────── */}
      <section className="px-4 md:px-10 py-20 bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl font-bold mb-14 text-[#333]"
        >
          App Highlights
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map(({ title, desc, icon: Icon }, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-[#e6f3f0] border border-[#d2ebe5] p-8 rounded-3xl shadow-sm hover:shadow-lg transition text-center"
            >
              <div className="flex justify-center mb-4">
                <Icon />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA Banner ──────────────────────────────────────── */}
      <section className="relative px-4 md:px-10 py-16 bg-[#66b2a3] overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Ready to Master Your Finances?
          </h2>
          <a
            href="/register"
            className="inline-block bg-white text-[#66b2a3] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 active:scale-95 transition"
          >
            Create your free account
          </a>
        </motion.div>

        <div className="absolute inset-x-0 -bottom-1 h-8 bg-gradient-to-t from-[#66b2a3] to-transparent" />
      </section>

      <Footer />
    </>
  );
}
