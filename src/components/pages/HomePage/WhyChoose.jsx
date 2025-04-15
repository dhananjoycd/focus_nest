import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Users,
  CalendarCheck,
  BookOpen,
  Lightbulb,
  Clock,
  DollarSign,
  Target,
} from "lucide-react";

const WhyChoose = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const reasons = [
    {
      title: "Money Manager",
      description: "Take control of your student finances effortlessly",
      icon: <DollarSign className="w-5 h-5 text-indigo-600" />,
      stats: "Students save 30% more than national average",
    },
    {
      title: "Smart Routine Planner",
      description: "AI-powered scheduling that adapts to your energy levels",
      icon: <Clock className="w-5 h-5 text-indigo-600" />,
      stats: "Reduces time wasted on planning by 65%",
    },
    {
      title: "Comprehensive Student Hub",
      description:
        "FocusNest combines all the tools students need - from schedule planning to financial tracking - in one intuitive platform. No more switching between multiple apps.",
      icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
      stats: "87% of users report improved organization",
    },
    {
      title: "Class Representative Toolkit",
      description:
        "Specialized features for class reps including announcement broadcasting, poll creation, attendance tracking, and group fund management.",
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      stats: "Used by class reps in 120+ universities",
    },
    {
      title: "AI-Powered Planning",
      description:
        "Our smart scheduler analyzes your routines, deadlines, and energy levels to create optimal study plans and remind you before important tasks.",
      icon: <CalendarCheck className="w-5 h-5 text-indigo-600" />,
      stats: "Reduces missed deadlines by 65%",
    },
    {
      title: "Goal Tracker Pro",
      description: "Transform your aspirations into achievable milestones",
      icon: <Target className="w-5 h-5 text-indigo-600" />,
      stats: "Users achieve 73% more goals than traditional methods",
    },
    {
      title: "Motivation System",
      description:
        "Personalized encouragement, achievement badges, and productivity insights to keep you motivated throughout your academic journey.",
      icon: <Lightbulb className="w-5 h-5 text-indigo-600" />,
      stats: "92% feel more motivated daily",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80">
      {/* Why Choose Section */}
      <section className="w-full px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Why <span className="text-indigo-600">Thousands of Students</span>{" "}
              Choose FocusNest
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              The all-in-one platform designed to simplify student life and
              amplify your academic success
            </motion.p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                    },
                  },
                }}
                whileHover={{ scale: 1.01 }}
                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden ${
                  activeIndex === index ? "ring-2 ring-indigo-200" : ""
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`accordion-content-${index}`}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="bg-indigo-50 p-2 rounded-lg"
                    >
                      {reason.icon || (
                        <CheckCircle className="w-5 h-5 text-indigo-600" />
                      )}
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {reason.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      id={`accordion-content-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.4 },
                          opacity: { duration: 0.3, delay: 0.2 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.2 },
                          opacity: { duration: 0.1 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 space-y-4">
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-gray-600"
                        >
                          {reason.description}
                        </motion.p>
                        {reason.stats && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center space-x-2 text-sm text-indigo-600 font-medium"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>{reason.stats}</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center mx-auto"
          >
            See How It Works
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
              animate={{
                rotate: [0, 15, 0, -15, 0],
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
              }}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </motion.svg>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default WhyChoose;
