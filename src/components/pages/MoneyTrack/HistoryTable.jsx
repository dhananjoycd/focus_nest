/* eslint-disable react/prop-types */
import { FilePenLine, Trash2 } from "lucide-react";
import { format } from "date-fns";
import PropTypes from "prop-types";

const HistoryTable = ({ type, data, btn }) => {
  return (
    <div className="overflow-x-auto bg-gray-200">
      <table className="table">
        {/* Table Header */}
        <thead>
          <tr className="bg-fuchsia-800 text-yellow-50 text-center">
            <th>No.</th>
            <th>
              {type === "Earnings" ? "Source of Money" : "Expense Category"}
            </th>
            <th>{type === "Earnings" ? "Income Type" : "Expense Type"}</th>
            <th>Amount (BDT)</th>
            <th>Date</th>
            <th>Update</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="text-center">
          {data?.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className=" border-b-gray-50 hover:bg-amber-50 shadow"
              >
                <th>{index + 1}</th>
                <td>{item.source}</td>
                <td>{item.type}</td>
                <td className="text-black">{item.amount}</td>
                <td className="text-[12px]">
                  {format(item.date, "dd MMM yyyy hh:mm:ss a")}
                </td>
                <td className="flex">
                  <button className="btn btn-sm me-1 btn-warning ">
                    <FilePenLine />
                  </button>
                  <button
                    onClick={() => btn(item._id)}
                    className="btn  btn-sm btn-error "
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-3">
                No {type} Records Found
              </td>
            </tr>
          )}
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
