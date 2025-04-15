/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = ({ user }) => {
  return (
    <motion.section
      className="text-center py-20 px-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Organize Your Life, Fuel Your Success with{" "}
        <span className="text-blue-600">Focus Nest</span>
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Your all-in-one productivity system for students, class reps, and
        achievers.
      </motion.p>

      {user ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Link
            to="/money"
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700"
          >
            Explore More
          </Link>
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            to="/signin"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50"
          >
            Login
          </Link>
        </motion.div>
      )}
    </motion.section>
  );
};

export default HeroSection;
