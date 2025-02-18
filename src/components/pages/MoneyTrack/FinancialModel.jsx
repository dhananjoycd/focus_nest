/* eslint-disable react/prop-types */
import { useState } from "react";

const FinancialModel = ({ id, title, type, onSubmit }) => {
  // State for form input
  const [formData, setFormData] = useState({
    source: "",
    type: "",
    amount: "",
    date: new Date().toISOString().split("T")[0], // Default today's date
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the provided onSubmit function
    document.getElementById(id).close(); // Close modal
    setFormData({
      source: "",
      type: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
    }); // Reset Form
  };

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Source of Money */}
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="Enter Source (e.g. Salary, Freelance)"
            className="input input-bordered w-full"
            required
          />

          {/* dynamic Type */}
          {type === "Earnings" ? (
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="select select-bordered w-full"
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
              className="select select-bordered w-full"
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
            className="input input-bordered w-full"
            required
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered w-full"
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
