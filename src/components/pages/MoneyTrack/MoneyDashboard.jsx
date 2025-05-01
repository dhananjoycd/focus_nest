import { useContext } from "react";
import FinanceContext from "../../../Providers/FinanceContext/FinanceContext";

import CurrentStatus from "./CurrentStatus/CurrentStatus";

const MoneyDashboard = () => {
  const { user } = useContext(FinanceContext);

  return (
    <div className="max-w-4xl mx-auto p-5 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow">
      {/* Header with greeting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              👋 Hello, {user?.displayName || "Dear"}!
            </span>
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            Your financial dashboard at a glance
          </p>
        </div>
      </div>

      {/* Main Balance Card */}
      <CurrentStatus />

      {/* Decorative Divider */}
      <div className="flex justify-center mt-6">
        <div className="h-1 w-24 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 rounded-full opacity-30"></div>
      </div>
      <div className="flex items-center justify-center"></div>
    </div>
  );
};

export default MoneyDashboard;
