import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import FinanceContext from "./FinanceContext";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";
import AuthContext from "../AuthContext/AuthContext";

const FinanceProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { fetchData, createData, deleteData } = useApi(
    "http://localhost:5000/api/money"
  );

  const [results, setResults] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const [todayEarnings, setTodayEarnings] = useState([]);
  const [todayExpenses, setTodayExpenses] = useState([]);

  const [last7DaysEarnings, setLast7DaysEarnings] = useState([]);
  const [last7DaysExpenses, setLast7DaysExpenses] = useState([]);

  const [last30DaysEarnings, setLast30DaysEarnings] = useState([]);
  const [last30DaysExpenses, setLast30DaysExpenses] = useState([]);

  // pesonal,food...
  const [earningsCategories, setEarningsCategories] = useState([]);
  const [expensesCategories, setExpensesCategories] = useState([]);

  const [filteredEarningsTransactions, setFilteredEarningsTransactions] =
    useState([]);
  const [filteredExpensesTransactions, setFilteredExpensesTransactions] =
    useState([]);

  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const loadFinanceData = async () => {
      try {
        if (!user?.uid) return;
        const earningsData = await fetchData("earnings");
        const expensesData = await fetchData("expenses");

        setEarnings(earningsData);
        setExpenses(expensesData);
      } catch (error) {
        console.error("Error fetching finance data:", error);
      }
    };

    loadFinanceData();
  }, [user]);

  // Total Amount Count
  useEffect(() => {
    setTotalEarnings(
      earnings.reduce((sum, earning) => sum + Number(earning.amount), 0)
    );
    setTotalExpenses(
      expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
    );
  }, [earnings, expenses]);

  // today, last 7 days, and last 30 days earnings and expenses
  useEffect(() => {
    const getFilteredData = (transactions, dateRange) => {
      const today = new Date();
      let startDate;

      if (dateRange === "today") {
        startDate = today.toISOString().split("T")[0];
      } else if (dateRange === "7days") {
        startDate = new Date(today.setDate(today.getDate() - 7))
          .toISOString()
          .split("T")[0];
      } else if (dateRange === "30days") {
        startDate = new Date(today.setDate(today.getDate() - 30))
          .toISOString()
          .split("T")[0];
      }

      return transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date)
          .toISOString()
          .split("T")[0]; // Compare date in YYYY-MM-DD format
        return transactionDate >= startDate; // Filter data within the date range
      });
    };

    setTodayEarnings(getFilteredData(earnings, "today"));
    setTodayExpenses(getFilteredData(expenses, "today"));
    setLast7DaysEarnings(getFilteredData(earnings, "7days"));
    setLast7DaysExpenses(getFilteredData(expenses, "7days"));
    setLast30DaysEarnings(getFilteredData(earnings, "30days"));
    setLast30DaysExpenses(getFilteredData(expenses, "30days"));
  }, [earnings, expenses]);

  const totalTodayEarnings = todayEarnings.reduce(
    (sum, earning) => sum + Number(earning.amount),
    0
  );
  const totalTodayExpenses = todayExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const totalLast7DaysEarnings = last7DaysEarnings.reduce(
    (sum, earning) => sum + Number(earning.amount),
    0
  );
  const totalLast7DaysExpenses = last7DaysExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const totalLast30DaysEarnings = last30DaysEarnings.reduce(
    (sum, earning) => sum + Number(earning.amount),
    0
  );
  const totalLast30DaysExpenses = last30DaysExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  // Extract unique categories(personal,health) from earnings and expenses su
  useEffect(() => {
    const getUniqueCategories = (transactions) => [
      ...new Set(transactions.map((transaction) => transaction.type)),
    ];

    setEarningsCategories(getUniqueCategories(earnings));
    setExpensesCategories(getUniqueCategories(expenses));
  }, [earnings, expenses]);

  // when Click Personal,Study type button UI then show the data
  useEffect(() => {
    const filterByType = (transactions, type) =>
      type
        ? transactions.filter((transaction) => transaction.type === type)
        : transactions;

    setFilteredEarningsTransactions(filterByType(earnings, selectedType));
    setFilteredExpensesTransactions(filterByType(expenses, selectedType));
  }, [earnings, expenses, selectedType]);

  // Function to add a new earning
  const addEarning = async (url, newEarning) => {
    await createData(url, newEarning);
    setEarnings((prevEarnings) => [...prevEarnings, newEarning]);
    toast.success("You have added Earning Money");
  };

  // Function to add a new expense
  const addExpense = async (url, newExpense) => {
    await createData(url, newExpense);
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    toast.success("You have added Expense Money");
  };

  // Function to delete an earning
  const deleteEarning = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure? This will permanently delete!"
    );
    if (!confirmDelete) return;
    deleteData("earnings", id);
    setEarnings(earnings.filter((earning) => earning._id !== id));
    toast.success("You have deleted Earning Money");
  };

  // Function to delete an expense
  const deleteExpense = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure? This will permanently delete!"
    );
    if (!confirmDelete) return;
    deleteData("expenses", id);
    setExpenses(expenses.filter((expense) => expense._id !== id));
    toast.success("You have deleted Expense Money");
  };

  return (
    <FinanceContext.Provider
      value={{
        addEarning,
        addExpense,
        earnings,
        expenses,
        deleteEarning,
        deleteExpense,
        totalEarnings,
        totalExpenses,
        totalLast30DaysExpenses,
        totalLast30DaysEarnings,
        totalLast7DaysExpenses,
        totalLast7DaysEarnings,
        totalTodayExpenses,
        totalTodayEarnings,
        last30DaysExpenses,
        last30DaysEarnings,
        todayExpenses,
        todayEarnings,
        last7DaysExpenses,
        last7DaysEarnings,
        earningsCategories,
        expensesCategories,
        filteredEarningsTransactions,
        filteredExpensesTransactions,
        setSelectedType,
        setExpenses,
        setEarnings,
        user,
        results,
        setResults,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

FinanceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FinanceProvider;
