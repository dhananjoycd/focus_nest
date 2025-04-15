import { useContext } from "react";
import FinanceContext from "../../../Providers/FinanceContext/FinanceContext";

import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

const MoneyDashboard = () => {
  const { totalEarnings, totalExpenses, user } = useContext(FinanceContext);
  const balance = totalEarnings - totalExpenses;
  const isPositive = balance >= 0;
  const formattedValue = (value) => value.toLocaleString("en-BD");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg">
      {/* Header with greeting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              👋 Hello, {user?.displayName || "User"}!
            </span>
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            Your financial dashboard at a glance
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-full shadow-sm">
          <Wallet
            className={`w-4 h-4 ${
              isPositive ? "text-green-500" : "text-rose-500"
            }`}
          />
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            {isPositive ? "Positive" : "Negative"} Balance
          </span>
        </div>
      </div>

      {/* Main Balance Card */}
      <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 dark:bg-indigo-900 opacity-10 rounded-bl-full"></div>

        <div className="relative z-10">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            <Wallet className="w-4 h-4" /> Current Balance
          </h2>
          <div className="flex items-end gap-2">
            <span
              className={`text-3xl md:text-4xl font-bold ${
                isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-rose-600 dark:text-rose-400"
              }`}
            >
              ৳ {formattedValue(balance)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">
              {isPositive ? "🎉 Great job!" : "💡 Save more!"}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Earnings Card */}
          <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Earnings
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  ৳ {formattedValue(totalEarnings)}
                </p>
              </div>
            </div>
          </div>

          {/* Expenses Card */}
          <div className="bg-rose-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm border-l-4 border-rose-500">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                <TrendingDown className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Expenses
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  ৳ {formattedValue(totalExpenses)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="flex justify-center mt-6">
        <div className="h-1 w-24 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 rounded-full opacity-30"></div>
      </div>
    </div>
  );
};

export default MoneyDashboard;
