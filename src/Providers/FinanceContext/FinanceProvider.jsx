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
        rawExpensesData,
        rawEarningsData,
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
