/* eslint-disable react/prop-types */
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import AddMoneyData from "../AddMoneyData";
import { useContext } from "react";
import FinanceContext from "../../../../Providers/FinanceContext/FinanceContext";

const CurrentStatus = () => {
  const { totalEarnings, totalExpenses } = useContext(FinanceContext);
  const balance = totalEarnings - totalExpenses;
  const isPositive = balance >= 0;
  const formattedValue = (value) => value.toLocaleString("en-BD");

  return (
    <>
      <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6">
        {/* Balance Indicator - Top Right Corner */}
        <div className="absolute top-3 right-8 flex items-center gap-2 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm z-20 border border-gray-100 dark:border-gray-600">
          <Wallet
            className={`w-4 h-4 ${
              isPositive ? "text-green-500" : "text-rose-500"
            }`}
          />
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            {isPositive
              ? `${
                  totalExpenses &&
                  totalEarnings > 0 &&
                  (
                    ((totalEarnings - totalExpenses) / totalEarnings) *
                    100
                  ).toFixed(2)
                }
              % Savings Rate`
              : "Negative  Balanc"}
          </span>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 dark:bg-indigo-900 opacity-10 rounded-bl-full"></div>
        <div className="relative z-10 flex flex-col items-center justify-center border-2 py-5 rounded-2xl border-dashed">
          <h2 className="flex items-center gap-2 font-bold text-sm md:text-2xl text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <Wallet className="w-4 h-4" /> Current Balance
          </h2>
          <div className="flex items-end gap-2">
            <span
              className={`text-2xl md:text-4xl font-bold ${
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
            <div className="flex items-center justify-center gap-3">
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
            <AddMoneyData type={"Earnings"} />
          </div>

          {/* Expenses Card */}
          <div className="bg-rose-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm border-l-4 border-rose-500">
            <div className="flex items-center justify-center gap-3">
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
            <AddMoneyData type={"Expenses"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentStatus;
