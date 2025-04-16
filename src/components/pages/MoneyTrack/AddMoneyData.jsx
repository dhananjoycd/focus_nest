/* eslint-disable react/prop-types */
import { useContext } from "react";
import FinancialModel from "./FinancialModel";
import FinanceContext from "../../../Providers/FinanceContext/FinanceContext";

const AddMoneyData = ({ type }) => {
  const {
    addEarning,
    addExpense,
    updateExpense,
    updateEarning,
    editingItem,
    setEditingItem,
  } = useContext(FinanceContext);
  return (
    <section className="my-3">
      {type === "Earnings" ? (
        <button
          className="btn btn-primary w-full"
          onClick={() => document.getElementById("earningModal").showModal()}
        >
          Add {type}
        </button>
      ) : (
        <button
          className="btn btn-secondary w-full"
          onClick={() => document.getElementById("expensesModal").showModal()}
        >
          Add {type}
        </button>
      )}

      <FinancialModel
        id={type === "Earnings" ? "earningModal" : "expensesModal"}
        title={`Add ${type}`}
        type={type}
        onSubmit={(endpoint, data, isEdit) => {
          if (isEdit) {
            type === "Earnings" ? updateEarning(data) : updateExpense(data);
          } else {
            type === "Earnings"
              ? addEarning(endpoint, data)
              : addExpense(endpoint, data);
          }
          setEditingItem(null);
        }}
        editData={editingItem}
      />
    </section>
  );
};

export default AddMoneyData;
