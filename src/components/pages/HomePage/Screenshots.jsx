/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Screenshots = ({ user }) => {
  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const screenshots = [
    {
      id: 2,
      title: "💰 Personal & Group Money Manager",
      description:
        "Track expenses, split bills, and manage budgets for individuals and student groups",
      url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Expense categorization",
        "Group bill splitting",
        "Visual spending analytics",
        "Savings goal tracker",
      ],
      color: "bg-emerald-50",
      navigateUrl: "/money",
      navigateTitle: "Explore Money Manager",
      isValidUser: user?.email || null,
    },
    {
      id: 3,
      title: "🗓️ Smart Routine & Planner",
      description:
        "AI-powered scheduling that adapts to your classes, deadlines, and personal rhythm",
      url: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Automatic class schedule import",
        "Smart study session planning",
        "Conflict detection",
        "Personal productivity insights",
      ],
      color: "bg-purple-50",
      navigateUrl: "/time",
      navigateTitle: "Try Smart Planner",
    },
    {
      id: 1,
      title: "🔵 Class Representative Manager",
      description:
        "Streamline class coordination with tools for announcements, polls, and attendance tracking",
      url: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Centralized announcement board",
        "Automated attendance tracking",
        "Class poll creator",
        "Deadline reminders",
      ],
      color: "bg-blue-50",
      navigateUrl: "/",
      navigateTitle: "View Class Rep Tools",
    },
    {
      id: 4,
      title: "📊 Goal Tracker & Daily Tasks",
      description:
        "Visual progress tracking with milestone breakdowns and daily actionable steps",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Custom goal templates",
        "Progress visualization",
        "Habit formation tools",
        "Achievement badges",
      ],
      color: "bg-amber-50",
      navigateUrl: "/",
      navigateTitle: "Track Your Goals",
    },
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % screenshots.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [index, isAutoPlaying, screenshots.length]);

  const next = () => setIndex((prev) => (prev + 1) % screenshots.length);
  const prev = () =>
    setIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));

  const renderContent = (item) => {
    return (
      <div className={`p-4 sm:p-6 ${item.color}`}>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2">
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-gray-700">
              {item.features.map((feature, i) => (
                <motion.li
                  key={i}
                  className="flex items-start py-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <span className="mr-2 text-blue-500 mt-0.5">✓</span>
                  <span className="text-sm sm:text-base">{feature}</span>
                </motion.li>
              ))}
            </ul>
            <Link
              to={item.navigateUrl}
              className="inline-flex items-center justify-center gap-2 mt-4 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 hover:scale-105"
            >
              {item.navigateTitle}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-12 md:py-20 bg-gray-50" id="screenshots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            Powerful Features, Seamless Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how our tools help you manage your life more effectively
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg max-w-5xl mx-auto bg-white"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={screenshots[index].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {renderContent(screenshots[index])}
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 md:p-3 rounded-full shadow-md hover:bg-white transition-all z-10"
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 md:p-3 rounded-full shadow-md hover:bg-white transition-all z-10"
            aria-label="Next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                index === i ? "bg-blue-600 w-4 sm:w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Screenshots;
