import PropTypes from "prop-types";
import HistoryTable from "./HistoryTable";
import { useContext, useEffect, useState } from "react";
import FinanceContext from "../../../Providers/FinanceContext/FinanceContext";
import FinancailHead from "./FinancailHead";
import Search from "./Search";
import AddMoneyData from "./AddMoneyData";

const FinancialSection = ({ type }) => {
  const {
    earnings,
    expenses,
    deleteEarning,
    deleteExpense,
    results,
    setResults,
    user,
    setEditingItem,
  } = useContext(FinanceContext);

  const [itemsToShow, setItemsToShow] = useState(10);
  const [customInput, setCustomInput] = useState("");

  const rawData =
    results?.length > 0 ? results : type === "Earnings" ? earnings : expenses;

  const reversedData = rawData.slice().reverse(); // Latest data first
  const slicedData = reversedData.slice(0, itemsToShow);

  const canLoadMore = itemsToShow < rawData.length;

  // Reset items when type changes
  useEffect(() => {
    setItemsToShow(10);
    setCustomInput(""); // Clear input when type changes
  }, [type]);

  // Show 10 records when input is cleared
  useEffect(() => {
    if (customInput === "") {
      setItemsToShow(10);
    }
  }, [customInput]);

  // Load more handler
  const handleLoadMore = () => {
    setItemsToShow((prev) => Math.min(prev + 10, rawData.length));
  };

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
    <div>
      {/* Header Section */}
      <FinancailHead type={type} />

      {/* History Section */}
      <section className="border border-amber-600 rounded p-2 shadow-2xl">
        <h2 className="text-center my-2 p-2 text-2xl border-b dark:text-amber-50">
          {type} History
        </h2>

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

        {/* Add Record Button + Modal */}
        <AddMoneyData type={type}></AddMoneyData>

        {/* History Table */}
        <HistoryTable
          type={type}
          data={slicedData}
          btn={type === "Earnings" ? deleteEarning : deleteExpense}
          onEdit={(item) => {
            setEditingItem(item);
            document
              .getElementById(
                type === "Earnings" ? "earningModal" : "expensesModal"
              )
              .showModal();
          }}
        />
      </section>

      {/* Load More + Custom Input Controls */}
      {canLoadMore && (
        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Load More Button */}
          <button
            onClick={handleLoadMore}
            className="btn btn-primary w-3/4 md:w-auto px-6 py-2 text-sm md:text-base shadow-md transition duration-300 ease-in-out hover:scale-105"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

FinancialSection.propTypes = {
  type: PropTypes.string.isRequired,
};

export default FinancialSection;
