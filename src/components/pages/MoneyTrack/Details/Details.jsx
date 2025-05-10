/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Format date to "Mon YYYY"
const getMonthYear = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// Group earnings & expenses by month
const prepareChartData = (earnings, expenses) => {
  const monthlyData = {};

  earnings.forEach((item) => {
    const month = getMonthYear(item.date);
    if (!monthlyData[month])
      monthlyData[month] = { month, earning: 0, expense: 0 };
    monthlyData[month].earning += parseFloat(item.amount);
  });

  expenses.forEach((item) => {
    const month = getMonthYear(item.date);
    if (!monthlyData[month])
      monthlyData[month] = { month, earning: 0, expense: 0 };
    monthlyData[month].expense += parseFloat(item.amount);
  });

  return Object.values(monthlyData);
};

// Group expenses by `type` (e.g., "Loan", "Food")
const getCategoryBreakdown = (expenses) => {
  const categoryTotals = {};
  expenses.forEach(({ type = "Uncategorized", amount }) => {
    if (!categoryTotals[type]) categoryTotals[type] = 0;
    categoryTotals[type] += parseFloat(amount);
  });
  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));
};

// Pie chart colors
const COLORS = [
  "#f87171",
  "#fb923c",
  "#facc15",
  "#34d399",
  "#60a5fa",
  "#a78bfa",
];

const Details = ({ earnings, expenses }) => {
  const sortedEarnings = [...earnings].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const chartData = prepareChartData(
    sortedEarnings.slice(0, 6),
    sortedExpenses.slice(0, 6)
  );

  const categoryData = getCategoryBreakdown(expenses);

  return (
    <section className="space-y-8 px-4 py-6 bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3] min-h-screen">
      {/* Monthly Income vs Expense */}
      <div className="card bg-gradient-to-br from-blue-50 to-indigo-100 shadow-md p-4">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">
          📊 Monthly Income vs Expense (Latest 6 Months)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="earning" fill="#10b981" name="Earning" />
            <Bar dataKey="expense" fill="#ef4444" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Income & Expense Trend */}
      <div className="card bg-white border border-gray-200 shadow-xl">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            📈 Income & Expense Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="earning"
                stroke="#10b981"
                strokeWidth={2}
                name="Earning"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={2}
                name="Expense"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expenses by Category */}
      <div className="card bg-white border border-gray-200 shadow-xl">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-rose-600 mb-4">
            🥗 Expenses by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Details;
