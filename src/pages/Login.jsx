import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form>
            <input
              type="email"
              placeholder="Email"
              className="input w-full mb-4 border px-3 py-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="input w-full mb-6 border px-3 py-2 rounded"
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Login
            </button>
          </form>
          <p className="text-sm mt-4 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
