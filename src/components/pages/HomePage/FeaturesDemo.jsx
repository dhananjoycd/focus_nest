import { motion } from "framer-motion";

const FeaturesDemo = () => {
  const features = [
    {
      icon: "💰",
      title: "Money Manager",
      description:
        "Track expenses, group funds, and savings goals with visual analytics.",
      color: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      icon: "📚",
      title: "Class Rep Manager",
      description:
        "Manage class tasks, announcements, and schedules efficiently.",
      color: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
      iconColor: "text-purple-500",
    },
    {
      icon: "🗓️",
      title: "Smart Routine",
      description:
        "AI-powered daily planner with smart reminders and habit tracking.",
      color: "bg-emerald-50",
      hoverColor: "hover:bg-emerald-100",
      iconColor: "text-emerald-500",
    },
    {
      icon: "📊",
      title: "Goal Tracker",
      description:
        "Break big goals into daily tasks with progress visualization.",
      color: "bg-amber-50",
      hoverColor: "hover:bg-amber-100",
      iconColor: "text-amber-500",
    },
    {
      icon: "🧮",
      title: "Tools Hub",
      description:
        "Access GPA calculators, unit converters, and academic tools.",
      color: "bg-indigo-50",
      hoverColor: "hover:bg-indigo-100",
      iconColor: "text-indigo-500",
    },
    {
      icon: "💡",
      title: "Motivation Corner",
      description: "Daily productivity tips and inspirational quotes.",
      color: "bg-pink-50",
      hoverColor: "hover:bg-pink-100",
      iconColor: "text-pink-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to{" "}
            <span className="text-blue-600">Succeed</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools designed specifically for student productivity
            and organization
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`${feature.color} ${feature.hoverColor} p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden relative group`}
            >
              <div
                className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  backgroundColor: feature.iconColor.replace("text-", "bg-"),
                }}
              />

              <div className={`text-5xl mb-6 ${feature.iconColor}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="mt-4">
                <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
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
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
            Explore All Features
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesDemo;
