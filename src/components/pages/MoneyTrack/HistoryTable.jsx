/* eslint-disable react/prop-types */
import { FilePenLine, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const HistoryTable = ({ type, data, btn, onEdit }) => {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setSortedData(sorted);
  }, [data]);
  return (
    <div className="overflow-x-auto bg-gray-200">
      <table className="table">
        {/* Table Header */}
        <thead>
          <tr className="bg-fuchsia-800 text-yellow-50 text-center">
            <th>No.</th>
            <th>{type === "Earnings" ? "Earnings" : "Expenses"} Details</th>
            <th>{type === "Earnings" ? "Income Type" : "Expense Type"}</th>
            <th>Amount (BDT)</th>
            <th>Date</th>
            <th>Update</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="text-center">
          <AnimatePresence>
            {sortedData?.length > 0 ? (
              sortedData.map((item, index) => (
                <motion.tr
                  key={item._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="border-b-gray-50 hover:bg-amber-50 shadow"
                >
                  <th className="relative px-4 py-3 group">
                    <div className="flex items-center justify-start gap-1.5">
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {index + 1}
                      </span>

                      {item.dataEdited && (
                        <span className="flex items-center gap-1 text-xs transition-all duration-300 transform hover:scale-110">
                          <Pencil className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 animate-pulse" />

                          {/* Text that appears on hover or always on larger screens */}
                          <span className="hidden sm:inline-flex items-center font-mono text-xs text-amber-600 dark:text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 italic ml-0.5">
                            edited
                          </span>

                          {/* Tooltip for mobile */}
                          <span className="sm:hidden absolute left-full ml-2 px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            This item was edited
                          </span>
                        </span>
                      )}
                    </div>

                    {/* Optional decorative element */}
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400/30 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </th>

                  <td>{item.source}</td>
                  <td>{item.type}</td>
                  <td className="text-black">{item.amount}</td>
                  <td className="text-[12px]">
                    {format(item.date, "dd MMM yyyy hh:mm:ss a")}
                  </td>
                  <td className="flex">
                    <button
                      className="btn btn-sm me-1 btn-warning"
                      onClick={() => onEdit(item)}
                    >
                      <FilePenLine />
                    </button>
                    <button
                      onClick={() => btn(item._id)}
                      className="btn btn-sm btn-error"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-3">
                  No {type} Records Found
                </td>
              </tr>
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

HistoryTable.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default HistoryTable;
