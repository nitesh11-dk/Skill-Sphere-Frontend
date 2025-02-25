import { FaChalkboardTeacher, FaUsers, FaLaptopCode } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <motion.div
    className="bg-gray-800 p-6 rounded-xl text-center shadow-md hover:shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    <Icon className={`text-4xl ${color} mx-auto`} />
    <h3 className="text-xl font-semibold mt-4">{title}</h3>
    <p className="text-gray-400 mt-2">{description}</p>
  </motion.div>
);

const FEATURES = [
  {
    icon: FaChalkboardTeacher,
    title: "Teach Your Skills",
    description: "Share your expertise and mentor others.",
    color: "text-blue-400"
  },
  {
    icon: FaUsers,
    title: "Join a Community",
    description: "Connect with like-minded individuals.",
    color: "text-green-400"
  },
  {
    icon: FaLaptopCode,
    title: "Learn New Skills",
    description: "Gain knowledge from industry experts.",
    color: "text-purple-400"
  }
];

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12 sm:px-6 lg:px-8">
    
        <motion.section
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-blue-400">
            Learn. Share. Grow.
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Join a community of learners and experts. Teach, learn, and
            collaborate in real time.
          </p>
          <Link to="/register">
            <motion.button
              className="mt-6 px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold shadow-lg
                transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </Link>
        </motion.section>

        {/* Features Section */}
        <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </section>
      </main>

      <footer className="py-6 text-center border-t border-gray-700">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} SkillShareHub. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
