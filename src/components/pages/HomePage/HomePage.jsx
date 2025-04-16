import { useContext } from "react";
import { motion } from "framer-motion";
import PageTransition from "../../../Providers/AnimationProvider/PageTransition";
import HeroSection from "./HeroSection";
import Screenshots from "./Screenshots";
import FeaturesDemo from "./FeaturesDemo";
import WhyChoose from "./WhyChoose";
import Testimonials from "./Testimonials";
import AboutMe from "./AboutMe";
import AuthContext from "../../../Providers/AuthContext/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  // Animation variants for section transitions
  const sectionVariants = {
    offscreen: {
      opacity: 0,
      y: 50,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800 overflow-hidden">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection user={user} />
        </motion.div>

        {/* Main Content Sections with scroll-triggered animations */}
        <div className="space-y-0">
          <motion.section
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <Screenshots user={user} />
          </motion.section>

          <motion.section
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl -z-10 transform scale-105 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            <FeaturesDemo />
          </motion.section>

          <motion.section
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <WhyChoose />
          </motion.section>

          <motion.section
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-3xl -z-10 blur-md opacity-0 hover:opacity-60 transition-opacity duration-500" />
            <Testimonials />
          </motion.section>

          <motion.section
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <AboutMe />
          </motion.section>
        </div>

        {/* Floating decoration elements */}
        <div className="fixed top-1/4 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-20 -z-10 blur-xl"></div>
        <div className="fixed bottom-1/3 right-20 w-48 h-48 rounded-full bg-purple-100 opacity-20 -z-10 blur-xl"></div>
      </div>
    </PageTransition>
  );
};

export default HomePage;
