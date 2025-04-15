/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import FinanceContext from "../../../Providers/FinanceContext/FinanceContext";

const FinancialModel = ({ id, title, type, onSubmit, editData }) => {
  const fullDateTime = format(new Date(), "yyyy-MM-dd'T'HH:mm");
  const { earningsCategories, expensesCategories } = useContext(FinanceContext);

  const [formData, setFormData] = useState({
    source: "",
    type: "",
    amount: "",
    date: fullDateTime,
  });

  const [customType, setCustomType] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editData) {
      setFormData(editData);

      const defaultTypes = [
        "Personal",
        "Family",
        "Loan",
        "Food",
        "Transport",
        "Study",
        "Health",
        ...earningsCategories,
        ...expensesCategories,
      ].map((item) => item.toLowerCase());

      const isCustom = !defaultTypes.includes(editData.type.toLowerCase());
      setShowCustomInput(isCustom);
      setCustomType(isCustom ? editData.type : "");
    } else {
      resetForm();
    }
  }, [editData, type]);

  const resetForm = () => {
    setFormData({
      source: "",
      type: "",
      amount: "",
      date: fullDateTime,
    });
    setCustomType("");
    setShowCustomInput(false);
    setError(null);
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === "type") {
      if (value === "Others") {
        setShowCustomInput(true);
        setFormData({ ...formData, type: "" });
      } else {
        setShowCustomInput(false);
        setCustomType("");
        setFormData({ ...formData, type: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCustomTypeChange = ({ target: { value } }) => {
    if (!value) return;

    if (value[0] !== value[0].toUpperCase())
      return setError("First letter must be uppercase!");
    if (value.slice(1) !== value.slice(1).toLowerCase())
      return setError("All letters after the first must be lowercase!");
    if (value.includes(" "))
      return setError("No spaces allowed — one word only! 🚫");

    setError(null);
    setCustomType(value);
    setFormData({ ...formData, type: value });
  };

  const handleAmountChange = ({ target: { value } }) => {
    if (Number(value) < 0) return setError("Negative amount not allowed!");
    if (/e/i.test(value)) {
      return setError(`Scientific notation (e.g.,${value}) is not allowed!`);
    }
    setFormData({ ...formData, amount: value });
    setError(null);
  };

  const handleDateChange = ({ target: { name, value } }) => {
    const parsedDate = new Date(value);
    if (isNaN(parsedDate.getTime())) {
      return setError("Invalid date format, Please Input Mannualy");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) return;

    const endpoint = type === "Earnings" ? "addEarning" : "addExpense";
    onSubmit(endpoint, formData, !!editData);

    document.getElementById(id)?.close();
    resetForm();
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

    const options =
      type === "Earnings"
        ? makeUnique(["Personal", "Family", "Loan", ...earningsCategories])
        : makeUnique([
            "Food",
            "Transport",
            "Study",
            "Health",
            ...expensesCategories,
          ]);

    return (
      <>
        <option value={formData.type}>{formData.type || "Select Type"}</option>
        {options.map((opt) => (
          <option key={opt} value={capitalize(opt)}>
            {capitalize(opt)}
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
          {editData ? `Edit ${type}` : title}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Source */}
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

          {/* Custom Type Input */}
          {showCustomInput && (
            <>
              <input
                type="text"
                placeholder="Enter your others type"
                value={customType}
                onChange={handleCustomTypeChange}
                className="input input-bordered w-full bg-white"
                required
              />
              <p className="text-[10px] text-red-600 font-semibold">
                * Type is case sensitive
              </p>
            </>
          )}

          {/* Amount */}
          <input
            type="number"
            name="amount"
            inputMode="decimal"
            pattern="^\d+(\.\d{1,2})?$"
            value={formData.amount}
            onChange={handleAmountChange}
            min="0"
            placeholder="Enter Amount (BDT)"
            className="input input-bordered w-full bg-white"
            required
          />

          {/* Date */}
          <div className="relative w-full mt-3">
            <label
              htmlFor="date"
              className="absolute left-4 -top-2 bg-gradient-to-r from-amber-300 to-pink-300 text-gray-900 text-xs px-2 rounded shadow-md pb-0.5"
            >
              Select Date & Time
            </label>
            <input
              type="datetime-local"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleDateChange}
              step="1"
              required
              className="text-center w-full h-12 px-3 rounded-xl border border-amber-400 bg-gradient-to-br from-yellow-100 to-pink-100 text-gray-800 placeholder:text-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-[12px] text-red-600 font-semibold">
              {`>> ${error}`}
            </p>
          )}

          {/* Action Buttons */}
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              {editData ? `Update ${type}` : `Save ${type}`}
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={() => {
                document.getElementById(id)?.close();
                resetForm();
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
