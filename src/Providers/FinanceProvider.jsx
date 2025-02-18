import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { createContext } from "react";

export const FinanceContext = createContext(null); // Create Context

const FinanceProvider = ({ children }) => {
  // dummy data
  const earningsData = [
    {
      source: "Tuition",
      type: "Personal",
      amount: 3000,
      date: "3:25 PM - 18 Feb, 2025",
    },
    {
      source: "Freelance",
      type: "Work",
      amount: 5000,
      date: "5:00 PM - 17 Feb, 2025",
    },
    {
      source: "Babu dice",
      type: "Family",
      amount: 2000,
      date: "5:00 PM - 19 Feb, 2025",
    },
  ];
  const expensesData = [
    {
      source: "boi kinci",
      type: "Study",
      amount: 3000,
      date: "3:25 PM - 18 Feb, 2025",
    },
  ];

  // Global state for earnings & expenses
  const [earnings, setEarnings] = useState(earningsData || []);
  const [expenses, setExpenses] = useState(expensesData || []);

  // Load from Local Storage (optional for persistence)
  useEffect(() => {
    const storedEarnings = JSON.parse(localStorage.getItem("earnings")) || [];
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setEarnings(storedEarnings);
    setExpenses(storedExpenses);
  }, []);

  // Save to Local Storage when data changes
  useEffect(() => {
    localStorage.setItem("earnings", JSON.stringify(earnings));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [earnings, expenses]);

  // Function to add a new earning
  const addEarning = (newEarning) => {
    setEarnings([...earnings, newEarning]);
  };

  // Function to add a new expense
  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  // Function to delete an earning
  const deleteEarning = (id) => {
    setEarnings(earnings.filter((earning) => earning.id !== id));
  };

  // Function to delete an expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <FinanceContext.Provider
      value={{
        earnings,
        expenses,
        addEarning,
        addExpense,
        deleteEarning,
        deleteExpense,
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
