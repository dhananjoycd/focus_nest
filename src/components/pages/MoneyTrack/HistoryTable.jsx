import PropTypes from "prop-types";

const HistoryTable = ({ type, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Table Header */}
        <thead>
          <tr className="bg-fuchsia-800 text-yellow-50">
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
        <tbody>
          {data?.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-base-300">
                <th>{index + 1}</th>
                <td>{item.source}</td>
                <td>{item.type}</td>
                <td>{item.amount}</td>
                <td>{item.date}</td>
                <td>
                  <button className="btn btn-sm btn-warning mr-2">Edit</button>
                  <button className="btn btn-sm btn-error">Delete</button>
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
