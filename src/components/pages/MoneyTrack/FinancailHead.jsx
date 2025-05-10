/* eslint-disable react/prop-types */
import { useContext } from "react";
import FinanceContext from "../../../Providers/FinanceContext/FinanceContext";
import SortingSection from "./SortingSection";

const FinancailHead = ({ type }) => {
  const {
    // numbers of amount

    totalEarnings,
    totalExpenses,
    totalTodayExpenses,
    totalTodayEarnings,
  } = useContext(FinanceContext);

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg text-white">
        <div className="flex justify-center items-center p-3 bg-white/20 rounded-xl text-lg font-semibold">
          Today {type}:{" "}
          {type === "Earnings" ? totalTodayEarnings : totalTodayExpenses}
        </div>
        <div className="flex justify-center items-center p-3 bg-white/20 rounded-xl text-lg font-semibold">
          Total {type}: {type === "Earnings" ? totalEarnings : totalExpenses}
        </div>
      </section>

      <SortingSection type={type} />
    </>
  );
};

export default FinancailHead;
