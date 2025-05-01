import { useContext, useState } from "react";
import { motion } from "framer-motion";
import AuthContext from "../../../Providers/AuthContext/AuthContext";
import FinanceContext from "../../../Providers/FinanceContext/FinanceContext";

const ProfileInfo = () => {
  let { user } = useContext(AuthContext);
  const { totalEarnings, totalExpenses } = useContext(FinanceContext);

  // Enhanced user data with financial information
  user = {
    name: user?.displayName || "John Doe",
    email: user?.email || "johndoe@example.com",
    bio: user?.bio || "Financial enthusiast & budget tracker",
    location: user?.location || "San Francisco, CA",
    memberSince: "January 2023",
    financialStats: {
      totalSavings: 12500,
      monthlyBudget: 3500,
      netWorth: 48750,
      debt: 12500,
    },
    preferredCurrency: "BDT",
    financialGoals: ["Early retirement", "Buy a home", "Travel the world"],
  };

  // Animation variants
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
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Sample financial data - replace with real data
  const [financialData] = useState({
    monthlyBudget: 15000, // in BDT
    monthlyExpenses: 11500, // in BDT
    savingsRate: 0.23,
    financialGoals: [
      { name: "Semester Exam Fees", target: 3200, progress: 0.9 },
      { name: "Buy Academic Books & Materials", target: 3000, progress: 0.5 },
      { name: "Laptop Savings", target: 40000, progress: 0.35 },
      { name: "Emergency Medical Fund", target: 5000, progress: 0.6 },
      { name: "IELTS Preparation Course", target: 15000, progress: 0.2 },
    ],
  });

  return (
    <motion.div
      className="overflow-hidden" //bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Financial Goals */}
      <motion.div variants={itemVariants}>
        <div className="  my-6 text-center flex items-center justify-center gap-5">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Current Balance
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ৳ {(totalEarnings - totalExpenses).toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Savings Rate
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {totalExpenses &&
                totalEarnings > 0 &&
                (
                  ((totalEarnings - totalExpenses) / totalEarnings) *
                  100
                ).toFixed(2)}
              %
            </p>
          </div>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Personal Information */}
        <motion.div className="space-y-4" variants={containerVariants}>
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm"
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
              Personal Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="w-5 mr-2 text-blue-500">📧</span>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-gray-700 dark:text-gray-200">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-5 mr-2 text-blue-500">📍</span>
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="text-gray-700 dark:text-gray-200">
                    {user.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-5 mr-2 text-blue-500">📅</span>
                <div>
                  <p className="text-xs text-gray-400">Member Since</p>
                  <p className="text-gray-700 dark:text-gray-200">
                    {user.memberSince}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-5 mr-2 text-blue-500">💱</span>
                <div>
                  <p className="text-xs text-gray-400">Preferred Currency</p>
                  <p className="text-gray-700 dark:text-gray-200">
                    {user.preferredCurrency}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Financial Overview */}
        <motion.div className="space-y-4" variants={containerVariants}>
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm"
          >
            {/* edited */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Goals Overview
              </h2>
              <div className="space-y-4">
                {financialData.financialGoals.map((goal, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {goal.name}
                      </span>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        ৳
                        {(goal.progress * goal.target).toLocaleString(
                          undefined,
                          { maximumFractionDigits: 0 }
                        )}{" "}
                        / ৳{goal.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full"
                        style={{ width: `${goal.progress * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:shadow-md transition-all">
                + Add New Goal
              </button>
            </div>
          </motion.div>

          {/* Financial Health Indicator */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm"
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-3">
              Financial Health
            </h3>
            <div className="flex items-center">
              <div className="relative w-full">
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 h-4 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <div
                  className="absolute -top-6 text-xs font-medium"
                  style={{ left: "65%" }}
                >
                  <span className="bg-white dark:bg-gray-800 px-1 rounded">
                    Good
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Based on your savings rate, debt-to-income ratio, and spending
              habits.
            </p>
          </motion.div>
        </motion.div>
      </div>
      {/* Quick Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <button className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg hover:shadow-md transition-all">
          <span>📊</span> View Reports
        </button>
        <button className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-lg hover:shadow-md transition-all">
          <span>🔔</span> Budget Alerts
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileInfo;
