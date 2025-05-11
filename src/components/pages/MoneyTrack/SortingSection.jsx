/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import FinanceContext from "../../../Providers/FinanceContext/FinanceContext";

const SortingSection = ({ type }) => {
  const {
    rawExpensesData,
    rawEarningsData,
    earningsCategories,
    expensesCategories,
    setResults,
  } = useContext(FinanceContext);

  const [selectedFilter, setSelectedFilter] = useState("This Month");
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("YYYY-MM")
  );
  const [activeCategory, setActiveCategory] = useState("");

  const today = moment();
  const yesterday = moment().subtract(1, "days");
  const startOfWeek = moment().startOf("week");

  const transactions = type === "Earnings" ? rawEarningsData : rawExpensesData;
  const categories =
    type === "Earnings" ? earningsCategories : expensesCategories;

  const getFilteredTransactions = () => {
    return transactions.filter((t) => {
      const date = moment(t.date);
      if (selectedFilter === "All") return true;
      if (selectedFilter === "Today") return date.isSame(today, "day");
      if (selectedFilter === "Yesterday") return date.isSame(yesterday, "day");
      if (selectedFilter === "This Week")
        return date.isSameOrAfter(startOfWeek, "day");
      if (selectedFilter === "This Month")
        return date.format("YYYY-MM") === selectedMonth;
      return true;
    });
  };

  const filteredTransactions = getFilteredTransactions();

  const calculateTotalByCategory = (category) =>
    filteredTransactions
      .filter((t) => t.type === category)
      .reduce((sum, t) => sum + Number(t.amount), 0);

  const handleCategoryClick = (category) => {
    const newCategory = activeCategory === category ? "" : category;
    setActiveCategory(newCategory);

    if (newCategory) {
      const categoryFiltered = filteredTransactions.filter(
        (t) => t.type === newCategory
      );
      setResults(categoryFiltered);
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    if (selectedFilter !== "This Month") {
      setSelectedMonth(moment().format("YYYY-MM"));
    }
  }, [selectedFilter]);

  return (
    <section className="my-6 border rounded-lg p-6 shadow-md bg-white">
      <h2 className="text-xl text-center font-bold text-gray-800 mb-5 border-b pb-2">
        {type} Overview
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {["All", "Today", "Yesterday", "This Week"].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`py-2 px-5 rounded-lg font-medium transition-all ${
              selectedFilter === filter
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}

        {/* Month Dropdown */}
        <select
          onChange={(e) => {
            setSelectedFilter("This Month");
            setSelectedMonth(e.target.value);
          }}
          value={selectedMonth}
          className="py-2 px-4 rounded-lg bg-gray-100 text-gray-700 border"
        >
          {Array.from({ length: 12 }, (_, i) => {
            const monthValue = moment().subtract(i, "months").format("YYYY-MM");
            return (
              <option key={monthValue} value={monthValue}>
                {moment(monthValue).format("MMMM YYYY")}
              </option>
            );
          })}
        </select>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {categories.map((category) => {
          const total = calculateTotalByCategory(category);
          const isActive = activeCategory === category;
          const bgClass =
            type === "Earnings"
              ? "bg-green-100 hover:bg-green-200 border-green-300"
              : "bg-red-100 hover:bg-red-200 border-red-300";

          return (
            <div
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`cursor-pointer p-4 rounded-xl shadow border-2 transition-all duration-300 text-center hover:scale-105 ${bgClass} ${
                isActive ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <p className="font-semibold text-gray-800">{category}</p>
              <p className="text-lg font-bold text-gray-900">{total}৳</p>
            </div>
          );
        })}
      </div>

      {/* Active Category Transactions */}

      <div className="mt-6 bg-gray-50 p-5 rounded-lg shadow-inner">
        <div className="text-center font-semibold text-gray-700">
          <span className="text-blue-600">
            {selectedFilter === "This Month"
              ? `In ${moment(selectedMonth).format("MMMM YYYY")} :`
              : selectedFilter}
          </span>{" "}
          <span className="text-red-600">
            {filteredTransactions.reduce((sum, t) => sum + Number(t.amount), 0)}
          </span>
          {"৳ (Total)"}
        </div>
      </div>
    </section>
  );
};

export default SortingSection;
