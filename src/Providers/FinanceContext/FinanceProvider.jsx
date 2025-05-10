import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import FinanceContext from "./FinanceContext";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";
import AuthContext from "../AuthContext/AuthContext";

const FinanceProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { fetchData, createData, deleteData, updateData } = useApi(
    "https://focus-nest-server.vercel.app/api/money"
  );

  const [results, setResults] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const [todayEarnings, setTodayEarnings] = useState([]);
  const [todayExpenses, setTodayExpenses] = useState([]);
  const [yesterdayEarnings, setYesterdayEarnings] = useState([]);
  const [yesterdayExpenses, setYesterdayExpenses] = useState([]);
  const [thisWeekEarnings, setThisWeekEarnings] = useState([]);
  const [thisWeekExpenses, setThisWeekExpenses] = useState([]);
  const [thisMonthEarnings, setThisMonthEarnings] = useState([]);
  const [thisMonthExpenses, setThisMonthExpenses] = useState([]);

  const [last7DaysEarnings, setLast7DaysEarnings] = useState([]);
  const [last7DaysExpenses, setLast7DaysExpenses] = useState([]);
  const [last30DaysEarnings, setLast30DaysEarnings] = useState([]);
  const [last30DaysExpenses, setLast30DaysExpenses] = useState([]);

  const [earningsCategories, setEarningsCategories] = useState([]);
  const [expensesCategories, setExpensesCategories] = useState([]);
  const [filteredEarningsTransactions, setFilteredEarningsTransactions] =
    useState([]);
  const [filteredExpensesTransactions, setFilteredExpensesTransactions] =
    useState([]);

  const [selectedType, setSelectedType] = useState("");
  const rawEarningsData = results?.length > 0 ? results : earnings;
  const rawExpensesData = results?.length > 0 ? results : expenses;

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

  // Total amount calculation
  useEffect(() => {
    setTotalEarnings(
      earnings.reduce((sum, earning) => sum + Number(earning.amount), 0)
    );
    setTotalExpenses(
      expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
    );
  }, [earnings, expenses]);

  // Dynamic filter by date
  useEffect(() => {
    const filterByDate = (transactions, range) => {
      const today = new Date();
      const currentDate = new Date();

      let startDate, endDate;

      if (range === "today") {
        startDate = new Date(today.setHours(0, 0, 0, 0));
        endDate = new Date(today.setHours(23, 59, 59, 999));
      } else if (range === "yesterday") {
        const y = new Date(currentDate);
        y.setDate(currentDate.getDate() - 1);
        startDate = new Date(y.setHours(0, 0, 0, 0));
        endDate = new Date(y.setHours(23, 59, 59, 999));
      } else if (range === "thisweek") {
        const firstDay = new Date(
          today.setDate(today.getDate() - today.getDay())
        );
        startDate = new Date(firstDay.setHours(0, 0, 0, 0));
        endDate = new Date(currentDate.setHours(23, 59, 59, 999));
      } else if (range === "thismonth") {
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
          23,
          59,
          59,
          999
        );
      }

      return transactions.filter((t) => {
        const txDate = new Date(t.date);
        return txDate >= startDate && txDate <= endDate;
      });
    };

    setTodayEarnings(filterByDate(rawEarningsData, "today"));
    setTodayExpenses(filterByDate(rawExpensesData, "today"));
    setYesterdayEarnings(filterByDate(rawEarningsData, "yesterday"));
    setYesterdayExpenses(filterByDate(rawExpensesData, "yesterday"));
    setThisWeekEarnings(filterByDate(rawEarningsData, "thisweek"));
    setThisWeekExpenses(filterByDate(rawExpensesData, "thisweek"));
    setThisMonthEarnings(filterByDate(rawEarningsData, "thismonth"));
    setThisMonthExpenses(filterByDate(rawExpensesData, "thismonth"));
    setLast7DaysEarnings(filterByDate(rawEarningsData, "last7"));
    setLast7DaysExpenses(filterByDate(rawExpensesData, "last7"));
    setLast30DaysEarnings(filterByDate(rawEarningsData, "last30"));
    setLast30DaysExpenses(filterByDate(rawExpensesData, "last30"));
  }, [earnings, expenses, results]);

  // Totals for new filters
  const reduceTotal = (list) =>
    list.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalTodayEarnings = reduceTotal(todayEarnings);
  const totalTodayExpenses = reduceTotal(todayExpenses);
  const totalYesterdayEarnings = reduceTotal(yesterdayEarnings);
  const totalYesterdayExpenses = reduceTotal(yesterdayExpenses);
  const totalThisWeekEarnings = reduceTotal(thisWeekEarnings);
  const totalThisWeekExpenses = reduceTotal(thisWeekExpenses);
  const totalThisMonthEarnings = reduceTotal(thisMonthEarnings);
  const totalThisMonthExpenses = reduceTotal(thisMonthExpenses);
  const totalLast7DaysEarnings = reduceTotal(last7DaysEarnings);
  const totalLast7DaysExpenses = reduceTotal(last7DaysExpenses);
  const totalLast30DaysEarnings = reduceTotal(last30DaysEarnings);
  const totalLast30DaysExpenses = reduceTotal(last30DaysExpenses);

  // Unique categories
  useEffect(() => {
    const getUniqueCategories = (transactions) => [
      ...new Set(transactions.map((t) => t.type)),
    ];
    setEarningsCategories(getUniqueCategories(rawEarningsData));
    setExpensesCategories(getUniqueCategories(rawExpensesData));
  }, [rawEarningsData, rawExpensesData]);

  useEffect(() => {
    const filterByType = (transactions, type) =>
      type ? transactions.filter((t) => t.type === type) : transactions;

    setFilteredEarningsTransactions(
      filterByType(rawEarningsData, selectedType)
    );
    setFilteredExpensesTransactions(
      filterByType(rawExpensesData, selectedType)
    );
  }, [rawEarningsData, rawExpensesData, selectedType]);

  const addEarning = async (url, newEarning) => {
    await createData(url, newEarning);
    setEarnings((prev) => [...prev, newEarning]);
    toast.success("You have added Earning Money");
  };

  const addExpense = async (url, newExpense) => {
    await createData(url, newExpense);
    setExpenses((prev) => [...prev, newExpense]);
    toast.success("You have added Expense Money");
  };

  const updateItem = async (updatedItem, setState) => {
    const { _id, ...data } = updatedItem;
    try {
      await updateData(_id, { ...data, dataEdited: true });
      setState((prev) =>
        prev?.map((item) =>
          item._id === _id ? { ...data, dataEdited: true } : item
        )
      );
      toast.success("You have Updated Data Successfully");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const updateEarning = (item) => updateItem(item, setEarnings);
  const updateExpense = (item) => updateItem(item, setExpenses);

  const deleteEarning = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure? This will permanently delete!"
    );
    if (!confirmDelete) return;
    deleteData("earnings", id);
    setEarnings(earnings.filter((e) => e._id !== id));
    toast.success("You have deleted Earning Money");
  };

  const deleteExpense = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure? This will permanently delete!"
    );
    if (!confirmDelete) return;
    deleteData("expenses", id);
    setExpenses(expenses.filter((e) => e._id !== id));
    toast.success("You have deleted Expense Money");
  };

  return (
    <FinanceContext.Provider
      value={{
        addEarning,
        addExpense,
        updateEarning,
        updateExpense,
        deleteEarning,
        deleteExpense,
        earnings,
        expenses,
        totalEarnings,
        totalExpenses,
        todayEarnings,
        todayExpenses,
        yesterdayEarnings,
        yesterdayExpenses,
        thisWeekEarnings,
        thisWeekExpenses,
        thisMonthEarnings,
        thisMonthExpenses,
        last7DaysEarnings,
        last7DaysExpenses,
        last30DaysEarnings,
        last30DaysExpenses,
        totalTodayEarnings,
        totalTodayExpenses,
        totalYesterdayEarnings,
        totalYesterdayExpenses,
        totalThisWeekEarnings,
        totalThisWeekExpenses,
        totalThisMonthEarnings,
        totalThisMonthExpenses,
        totalLast7DaysEarnings,
        totalLast7DaysExpenses,
        totalLast30DaysEarnings,
        totalLast30DaysExpenses,
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
        editingItem,
        setEditingItem,
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
