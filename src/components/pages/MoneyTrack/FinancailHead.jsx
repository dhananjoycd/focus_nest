/* eslint-disable react/prop-types */
import { useContext } from "react";
import FinanceContext from "../../../Providers/FinanceContext/FinanceContext";

const FinancailHead = ({ type }) => {
  const {
    // numbers of amount
    totalEarnings,
    totalExpenses,
    totalLast30DaysExpenses,
    totalLast30DaysEarnings,
    totalLast7DaysExpenses,
    totalLast7DaysEarnings,
    totalTodayExpenses,
    totalTodayEarnings,

    //filtered data
    filteredEarningsTransactions,
    filteredExpensesTransactions,

    //categories list
    earningsCategories,
    expensesCategories,
  } = useContext(FinanceContext);

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg text-white">
        <div className="flex justify-center items-center p-3 bg-white/20 rounded-xl text-lg font-semibold">
          Today {type}:{" "}
          {type === "Earnings" ? totalTodayEarnings : totalTodayExpenses}
        </div>
        <div className="flex justify-center items-center p-3 bg-white/20 rounded-xl text-lg font-semibold">
          Total {type}: {type === "Earnings" ? totalEarnings : totalExpenses}
        </div>
      </section>

      {/*Sorting Section */}
      <section className="my-5 border rounded-lg p-4 shadow-md bg-gray-50">
        <h2 className="text-lg border-b text-center font-semibold text-gray-700 mb-3">
          Sort {type} by:
        </h2>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 text-center">
          {["Today", "Last 7 Days", "Last 30 Days"].map((filter, index) =>
            type === "Earnings" ? (
              <button
                key={index}
                className="py-2 px-4 bg-yellow-200 text-gray-700 font-semibold rounded-lg shadow-sm transition-all duration-300 hover:bg-blue-500 hover:text-white active:bg-blue-600 focus:outline-none"
              >
                {filter}{" "}
                <span>
                  {filter === "Today" && totalTodayEarnings}
                  {filter === "Last 7 Days" && totalLast7DaysEarnings}
                  {filter === "Last 30 Days" && totalLast30DaysEarnings}
                </span>
              </button>
            ) : (
              <button
                key={index}
                className="py-2 px-4 bg-red-300 text-gray-700 font-semibold rounded-lg shadow-sm transition-all duration-300 hover:bg-blue-500 hover:text-white active:bg-blue-600 focus:outline-none"
              >
                {filter}{" "}
                <span>
                  {filter === "Today" && totalTodayExpenses}
                  {filter === "Last 7 Days" && totalLast7DaysExpenses}
                  {filter === "Last 30 Days" && totalLast30DaysExpenses}
                </span>
              </button>
            )
          )}
        </div>

        {/* Categories Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 my-5 p-4">
          {type === "Earnings"
            ? earningsCategories.map((category, index) => {
                const totalFilteredEarnings = filteredEarningsTransactions
                  .filter((c) => c.type === category)
                  .reduce((sum, c) => sum + Number(c.amount), 0);

                return (
                  <button
                    key={index}
                    className="bg-pink-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 hover:bg-pink-500 hover:scale-105 focus:outline-none"
                  >
                    {/* ADD CSS */}
                    {`${category}  ${totalFilteredEarnings}`}
                  </button>
                );
              })
            : expensesCategories.map((category, index) => {
                const totalFilteredExpenses = filteredExpensesTransactions
                  .filter((c) => c.type === category)
                  .reduce((sum, c) => sum + Number(c.amount), 0);

                return (
                  <button
                    key={index}
                    className="bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-500 hover:scale-105 focus:outline-none"
                  >
                    {/* ADD CSS */}
                    {`${category}  ${totalFilteredExpenses}`}
                  </button>
                );
              })}
        </div>
      </section>
    </>
  );
};

export default FinancailHead;
