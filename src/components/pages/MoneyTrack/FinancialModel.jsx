/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { useState } from "react";

const FinancialModel = ({ id, title, type, onSubmit }) => {
  const fullDateTime = format(new Date(), "dd MMM yyyy hh:mm:ss a");

  // State for form input
  const [formData, setFormData] = useState({
    source: "",
    type: "",
    amount: "",
    date: fullDateTime,
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // store data in database
    const endpoint = type === "Earnings" ? "addEarning" : "addExpense";
    onSubmit(endpoint, formData);
    document.getElementById(id).close(); // Close modal
    setFormData({
      source: "",
      type: "",
      amount: "",
      date: fullDateTime,
    }); // Reset Form
  };

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-amber-50 dark:bg-gray-600">
        <h3 className="font-bold text-lg text-red-700 dark:text-yellow-400 mb-2 p-2 border rounded text-center">
          {title}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Source of Money */}
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="Enter Source (e.g. Salary, Freelance)"
            className="input input-bordered w-full bg-white"
            required
          />
          {/* dynamic Type */}
          {type === "Earnings" ? (
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="select select-bordered w-full bg-white"
              required
            >
              <option value="">Select Type</option>
              <option value="Personal">Personal</option>
              <option value="Family">Family</option>
              <option value="Loan">Loan</option>
              <option value="Others">Others</option>
            </select>
          ) : (
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="select select-bordered w-full bg-white"
              required
            >
              <option value="">Select Type</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Study">Study</option>
              <option value="Health">Health</option>
              <option value="Others">Others</option>
            </select>
          )}
          {/* Amount */}
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter Amount (BDT)"
            className="input input-bordered w-full bg-white"
            required
          />
          {/* Date (disabled and non-editable) */}

          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="text-center text-gray-700  w-full bg-gray-200 rounded h-10"
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
              onClick={() => document.getElementById(id).close()}
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
