import PropTypes from "prop-types";
import Search from "./Search";
import HistoryTable from "./HistoryTable";
import FinancialModel from "./FinancialModel";
import { useContext } from "react";
import { FinanceContext } from "../../../Providers/FinanceProvider";

const FinancialSection = ({ type, data }) => {
  const { addEarning, addExpense } = useContext(FinanceContext);
  return (
    <div>
      {/* Header Section */}
      <section className="grid grid-cols-12 mt-3">
        <div className="col-span-6">Current {type}</div>
        <div className="col-span-6">Total {type}</div>
      </section>

      {/* Search and sorting Section */}
      <section className="mt-3 text-center">
        <p>It can be Monthly, Weekly, or All {type} history</p>
        <Search />
      </section>

      {/* Categories Section */}
      <section className="grid grid-cols-12 mt-3">
        <div className="col-span-3">Personal</div>
        <div className="col-span-3">Family</div>
        <div className="col-span-3">Loan</div>
        <div className="col-span-3">Others</div>
      </section>

      {/* Button to Add Income or Expense */}
      <section>
        {type === "Earnings" ? (
          <>
            {" "}
            <button
              className="btn btn-primary w-full mt-3"
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
            {" "}
            <button
              className="btn btn-primary w-full mt-3"
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

      {/* History Section */}
      <section>
        <h2 className="text-center my-2 p-2 text-2xl border border-solid">
          {type} History
        </h2>

        <HistoryTable type={type} data={data}></HistoryTable>

        <div className="text-center">
          <button className="btn btn-primary w-1/4">Load More</button>
        </div>
      </section>
    </div>
  );
};

FinancialSection.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
export default FinancialSection;
