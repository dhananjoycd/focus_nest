import { useContext } from "react";
import FinanceContext from "../../../Providers/FinanceContext/FinanceContext";

const DueLedger = () => {
  const { earnings, updateEarning } = useContext(FinanceContext);
  const dues = earnings.filter((e) => e.paymentStatus === "due");

  const markAsPaid = (item) => {
    updateEarning({ ...item, paymentStatus: "paid" });
  };

  return (
    <div id="due-ledger" className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-t-4 border-amber-500">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        📓 বাকির খাতা (Due Ledger)
      </h2>
      {dues.length === 0 ? (
        <p className="text-gray-500">আপনার বাজারে কোনো বাকি নেই। (No dues in the market)</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-left">
            <thead>
              <tr className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100">
                <th>Date</th>
                <th>Customer Name</th>
                <th>Item/Source</th>
                <th>Amount (৳)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dues.map((due) => (
                <tr key={due._id}>
                  <td>{new Date(due.date).toLocaleDateString()}</td>
                  <td className="font-semibold">{due.customerName}</td>
                  <td>{due.source}</td>
                  <td className="text-error font-bold">{due.amount}</td>
                  <td>
                    <button
                      onClick={() => markAsPaid(due)}
                      className="btn btn-xs btn-success text-white"
                    >
                      Mark as Paid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DueLedger;
