import { useContext, useMemo } from "react";
import moment from "moment";
import FinanceContext from "../Providers/FinanceContext/FinanceContext";

const useFilteredTransactions = (type, selectedFilter, selectedMonth) => {
  const {
    rawExpensesData,
    rawEarningsData,
    earningsCategories,
    expensesCategories,
  } = useContext(FinanceContext);

  const today = moment();
  const yesterday = moment().subtract(1, "days");
  const startOfWeek = moment().startOf("week");

  const transactions = type === "Earnings" ? rawEarningsData : rawExpensesData;
  const categories =
    type === "Earnings" ? earningsCategories : expensesCategories;

  const filteredTransactions = useMemo(() => {
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
  }, [
    transactions,
    selectedFilter,
    selectedMonth,
    startOfWeek,
    today,
    yesterday,
  ]);

  return { filteredTransactions, categories };
};

export default useFilteredTransactions;
