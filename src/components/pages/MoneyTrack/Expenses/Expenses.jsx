import { useContext } from "react";
import FinancialSection from "../FinancialSection";
import { FinanceContext } from "../../../../Providers/FinanceProvider";

const Expenses = () => {
  const { expenses } = useContext(FinanceContext);
  return (
    <FinancialSection type={"Expenses"} data={expenses}></FinancialSection>
  );
};

export default Expenses;
