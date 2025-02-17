/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../../../Providers/AnimationProvider/PageTransition";

const NotFound = () => {
  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center px-6">
        {/* Animated 404 Text */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[10rem] font-extrabold tracking-widest text-gray-200 drop-shadow-lg"
        >
          404
        </motion.h1>

        {/* Oops! Message */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-semibold mt-4 text-gray-300"
        >
          Oops! Page Not Found
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          className="text-lg text-gray-400 mt-2"
        >
          <p> The page you are looking for doesn't exist or has been moved.</p>
        </motion.p>

        {/* Cool Button with Hover Effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8"
        >
          <Link
            to="/"
            className="relative inline-block px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-blue-500 scale-0 transition-transform group-hover:scale-100 origin-center"></span>
            <span className="relative z-10">Go Home</span>
          </Link>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
