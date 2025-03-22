import PropTypes from "prop-types";
import HistoryTable from "./HistoryTable";
import FinancialModel from "./FinancialModel";
import { useContext } from "react";
import FinanceContext from "../../../Providers/FinanceContext/FinanceContext";
import FinancailHead from "./FinancailHead";

const FinancialSection = ({ type }) => {
  const {
    addEarning,
    addExpense,
    earnings,
    expenses,
    deleteEarning,
    deleteExpense,
    results,
  } = useContext(FinanceContext);

  return (
    <div>
      {/* Header Section */}
      <FinancailHead type={type}></FinancailHead>
      {/* History Section */}
      <section className="border border-amber-600 rounded p-2 shadow-2xl">
        <h2 className="text-center my-2 p-2 text-2xl border-b dark:text-amber-50">
          {type} History
        </h2>

        {/* Button to Add Income or Expense */}
        <section className="my-3">
          {type === "Earnings" ? (
            <>
              <button
                className="btn btn-primary w-full"
                onClick={() =>
                  document.getElementById("earningModal").showModal()
                }
              >
                Add {type}
              </button>
              {/* money modal */}
              <FinancialModel
                id="earningModal"
                title="Add Earning"
                type="Earnings"
                onSubmit={addEarning}
              ></FinancialModel>
            </>
          ) : (
            <>
              <button
                className="btn btn-secondary  w-full mt"
                onClick={() =>
                  document.getElementById("expensesModal").showModal()
                }
              >
                Add {type}
              </button>
              {/* money modal */}
              <FinancialModel
                id="expensesModal"
                title="Add Expenses"
                type="Expenses"
                onSubmit={addExpense}
              ></FinancialModel>
            </>
          )}
        </section>
        <HistoryTable
          type={type}
          data={
            results.length > 0
              ? results
              : type === "Earnings"
              ? earnings
              : expenses
          }
          btn={type === "Earnings" ? deleteEarning : deleteExpense}
        />
      </section>
      <div className=" mt-5 text-center">
        <button className="btn btn-primary w-1/4">Load More</button>
      </div>
    </div>
  );
};

FinancialSection.propTypes = {
  type: PropTypes.string.isRequired,
};
export default FinancialSection;
