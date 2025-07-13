import heroImage from "../assets/hero.png";
import Navbar from "../components/navBar/Navbar";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="flex flex-col md:flex-row items-center justify-center px-6 py-12 gap-10">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Take Control of Your Money
          </h1>
          <p className="text-gray-600 mb-6">
            Track expenses, manage bills, and visualize your financial goals —
            all in one place.
          </p>
          <div className="space-x-4">
            <a
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
            >
              Learn More
            </a>
          </div>
        </div>
        <img
          src={heroImage}
          alt="Dashboard preview"
          className="w-full md:w-1/2"
        />
      </section>
      <Footer />
    </>
  );
};

export default Home;
