/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { useContext, useState } from "react";
import FinanceContext from "../../../Providers/FinanceContext/FinanceContext";
import { toast } from "react-toastify";

const FinancialModel = ({ id, title, type, onSubmit }) => {
  const fullDateTime = format(new Date(), "dd MMM yyyy hh:mm:ss a");
  const {
    //categories list
    earningsCategories,
    expensesCategories,
  } = useContext(FinanceContext);

  const [formData, setFormData] = useState({
    source: "",
    type: "",
    amount: "",
    date: fullDateTime,
  });

  const [customType, setCustomType] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type" && value === "Others") {
      setShowCustomInput(true);
      setFormData({ ...formData, [name]: "" });
    } else {
      setShowCustomInput(false);
      setCustomType("");
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCustomTypeChange = (e) => {
    const value = e.target.value;

    // Disallow spaces
    if (value.includes(" "))
      return toast.error("No spaces allowed — one word only! 🚫 ");

    setCustomType(value);
    setFormData({ ...formData, type: value });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (Number(value) >= 0) {
      setFormData({ ...formData, amount: value });
    } else return toast.error("Negative amount not allow!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const endpoint = type === "Earnings" ? "addEarning" : "addExpense";
    onSubmit(endpoint, formData);

    document.getElementById(id).close();

    setFormData({
      source: "",
      type: "",
      amount: "",
      date: fullDateTime,
    });
    setCustomType("");
    setShowCustomInput(false);
  };

  const renderTypeOptions = () => {
    const capitalize = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const makeUnique = (arr) => {
      const seen = new Set();
      return arr.filter((item) => {
        const lower = item.toLowerCase();
        if (seen.has(lower)) return false;
        seen.add(lower);
        return true;
      });
    };

    const earningsOptions = makeUnique([
      "Personal",
      "Family",
      "Loan",
      ...earningsCategories,
    ]).map(capitalize);

    const expenseOptions = makeUnique([
      "Food",
      "Transport",
      "Study",
      "Health",
      ...expensesCategories,
    ]).map(capitalize);

    const options = type === "Earnings" ? earningsOptions : expenseOptions;

    return (
      <>
        <option value="">Select Type</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
        <option value="Others">Others</option>
      </>
    );
  };

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-amber-50 dark:bg-gray-600">
        <h3 className="font-bold text-lg text-red-700 dark:text-yellow-400 mb-2 p-2 border rounded text-center">
          {title}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="Enter Source (e.g. Salary, Freelance)"
            className="input input-bordered w-full bg-white"
            required
          />

          {/* Type Dropdown */}
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select select-bordered w-full bg-white"
            required={!showCustomInput}
          >
            {renderTypeOptions()}
          </select>

          {/* Custom Type Input Field */}
          {showCustomInput && (
            <input
              type="text"
              placeholder="Enter your others type"
              value={customType}
              onChange={handleCustomTypeChange}
              className="input input-bordered w-full bg-white"
              required
            />
          )}

          {/* Amount */}
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleAmountChange}
            min="0"
            placeholder="Enter Amount (BDT)"
            className="input input-bordered w-full bg-white"
            required
          />

          {/* Date (readonly) */}
          <input
            type="text"
            name="date"
            value={formData.date}
            className="text-center text-gray-700 w-full bg-gray-200 rounded h-10"
            disabled
            required
          />

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Save {type}
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={() => {
                document.getElementById(id).close();
                setShowCustomInput(false);
                setCustomType("");
              }}
            >
              Exit
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default FinancialModel;
