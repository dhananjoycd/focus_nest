/* eslint-disable react/prop-types */
import { useContext } from "react";
import FinanceContext from "../../../Providers/FinanceContext/FinanceContext";
import SortingSection from "./SortingSection";
import Search from "./Search";

const FinancailHead = ({
  type,
  rawData,
  setCustomInput,
  setItemsToShow,
  customInput,
}) => {
  const {
    // numbers of amount
    setResults,
    user,
    totalEarnings,
    totalExpenses,
    totalTodayExpenses,
    totalTodayEarnings,
  } = useContext(FinanceContext);

  // Input change handler
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      const clampedValue = Math.min(Math.max(value, 1), rawData.length);
      setItemsToShow(clampedValue);
      setCustomInput(clampedValue);
    } else {
      setCustomInput("");
    }
  };

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

      {/* for Searching Data */}
      {type === "Earnings" ? (
        <Search setResults={setResults} uid={user?.uid} type="earning" />
      ) : (
        <Search setResults={setResults} uid={user?.uid} type="expense" />
      )}
      {/* Input for custom record count */}
      <div className="w-full px-4 py-3 mt-4 mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md">
        <input
          type="number"
          min="1"
          max={rawData.length}
          value={customInput}
          onChange={handleInputChange}
          className=" text-center w-full px-3 py-2 rounded-lg border border-blue-300 bg-white text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm md:text-base"
          placeholder={`Enter a number (1–${rawData.length}) to show records`}
        />
      </div>

      <SortingSection type={type} />
    </>
  );
};

export default FinancailHead;
