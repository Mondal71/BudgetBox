import Navbar from "../components/navBar/Navbar";
import Footer from "../components/footer/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-10 text-center">
        <h1 className="text-3xl font-bold">About BudgetBox</h1>
      </div>
      <Footer />
    </>
  );
};

export default About;
