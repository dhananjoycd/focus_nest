import { useContext } from "react";
import FinancialSection from "../FinancialSection";
import { FinanceContext } from "../../../../Providers/FinanceProvider";

const Earnings = () => {
  const { earnings } = useContext(FinanceContext);
  return (
    <FinancialSection type={"Earnings"} data={earnings}></FinancialSection>
  );
};

export default Earnings;
