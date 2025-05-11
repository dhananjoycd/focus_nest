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
  LabelList,
} from "recharts";

// Utilities
const getMonthYear = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const prepareChartData = (earnings, expenses) => {
  const monthlyData = {};

  [...earnings, ...expenses].forEach((item) => {
    const month = getMonthYear(item.date);
    if (!monthlyData[month])
      monthlyData[month] = { month, earning: 0, expense: 0 };
    if (item.type === "earning") {
      monthlyData[month].earning += parseFloat(item.amount);
    } else {
      monthlyData[month].expense += parseFloat(item.amount);
    }
  });

  // Sort by most recent month
  const sorted = Object.values(monthlyData).sort(
    (a, b) => new Date(b.month) - new Date(a.month)
  );

  return sorted.slice(0, 6).reverse();
};

const getCategoryBreakdown = (expenses) => {
  const categoryTotals = {};
  expenses.forEach(({ type = "Uncategorized", amount }) => {
    if (!categoryTotals[type]) categoryTotals[type] = 0;
    categoryTotals[type] += parseFloat(amount);
  });

  const total = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / total) * 100).toFixed(1),
  }));
};

// colors generated
const generateDynamicColors = (count) => {
  const colors = [];
  const saturation = 70; // % (controls how vivid the colors are)
  const lightness = 60; // % (controls brightness)

  for (let i = 0; i < count; i++) {
    const hue = Math.floor((360 / count) * i); // Spread hues evenly
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
};

const Details = ({ earnings, expenses }) => {
  const formattedEarnings = earnings.map((e) => ({ ...e, type: "earning" }));
  const formattedExpenses = expenses.map((e) => ({ ...e, type: "expense" }));

  const chartData = prepareChartData(formattedEarnings, formattedExpenses);
  const categoryData = getCategoryBreakdown(expenses);
  const categoryDataEarnings = getCategoryBreakdown(earnings);

  const totalEarning = earnings.reduce(
    (acc, curr) => acc + parseFloat(curr.amount),
    0
  );
  const totalExpense = expenses.reduce(
    (acc, curr) => acc + parseFloat(curr.amount),
    0
  );
  const net = totalEarning - totalExpense;

  const COLORS1 = generateDynamicColors(categoryData.length);
  const COLORS2 = generateDynamicColors(categoryDataEarnings.length);

  return (
    <section className="space-y-10 px-4 py-8 bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3] min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-green-100 p-4 rounded-xl shadow text-green-700 font-semibold">
          💰 Total Earnings: ৳ {totalEarning.toFixed(2)}
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow text-red-600 font-semibold">
          💸 Total Expenses: ৳ {totalExpense.toFixed(2)}
        </div>
        <div
          className={`p-4 rounded-xl shadow font-semibold ${
            net >= 0
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          📊 Net Savings: ৳ {net.toFixed(2)}
        </div>
      </div>

      {/* Monthly Income vs Expense */}
      <div className="card bg-gradient-to-br from-blue-50 to-indigo-100 shadow-md p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">
          📊 Monthly Income vs Expense (Last 6 Months)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="month" tick={{ fill: "#374151", fontSize: 12 }} />
            <YAxis tick={{ fill: "#374151", fontSize: 12 }} />
            <Tooltip
              formatter={(value) => `৳${value}`}
              labelStyle={{ color: "#1f2937", fontWeight: "bold" }}
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderColor: "#e5e7eb",
              }}
            />
            <Legend wrapperStyle={{ fontSize: 14 }} />
            <Bar dataKey="earning" fill="#10b981" name="Earning">
              <LabelList
                dataKey="earning"
                position="top"
                style={{ fill: "#065f46", fontSize: 12, fontWeight: 600 }}
                formatter={(val) => `৳${val}`}
              />
            </Bar>
            <Bar dataKey="expense" fill="#ef4444" name="Expense">
              <LabelList
                dataKey="expense"
                position="top"
                style={{ fill: "#991b1b", fontSize: 12, fontWeight: 600 }}
                formatter={(val) => `৳${val}`}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Income & Expense Trend */}
      <div className="card bg-white border border-gray-200 shadow-xl rounded-xl">
        <div className="card-body p-4">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            📈 Income & Expense Trend
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
            >
              <XAxis
                dataKey="month"
                tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [`৳${value}`, "Amount"]}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#cbd5e1",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "#111827",
                }}
                labelStyle={{ fontWeight: "bold", color: "#1f2937" }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: 10,
                  fontSize: 13,
                  color: "#1e293b",
                }}
              />
              <Line
                type="monotone"
                dataKey="earning"
                stroke="#10b981"
                strokeWidth={3}
                name="Earning"
                dot={{
                  r: 5,
                  stroke: "#10b981",
                  strokeWidth: 2,
                  fill: "#ffffff",
                }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={3}
                name="Expense"
                dot={{
                  r: 5,
                  stroke: "#ef4444",
                  strokeWidth: 2,
                  fill: "#ffffff",
                }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* earnings by Category */}
      <div className="card bg-white border border-gray-200 shadow-xl rounded-xl">
        <div className="card-body p-4">
          <h2 className="text-xl font-semibold text-rose-600 mb-4">
            🥗 Earnings by Category
          </h2>
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 w-full">
            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height={300} className="lg:w-2/3">
              <PieChart>
                <Pie
                  data={categoryDataEarnings}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label={({ name, percentage }) => `${name} (${percentage}%)`}
                >
                  {categoryDataEarnings.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS2[index % COLORS2.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`৳${value.toFixed(2)}`, name]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#cbd5e1",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#111827",
                  }}
                  labelStyle={{ fontWeight: "bold", color: "#1f2937" }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend / Category Summary */}
            <div className="bg-gray-100 rounded-xl shadow-md p-4 lg:w-1/3 w-full">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                🧾 See Details:
              </h3>
              <ul className="space-y-2">
                {[...categoryDataEarnings]
                  .sort((a, b) => b.percentage - a.percentage)
                  .map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="inline-block w-4 h-4 rounded-full"
                          style={{
                            backgroundColor: COLORS2[index % COLORS2.length],
                          }}
                        />
                        <span className="text-sm text-gray-800 font-medium">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 font-semibold">
                        {item.percentage}%
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses by Category */}
      <div className="card bg-white border border-gray-200 shadow-xl rounded-xl">
        <div className="card-body p-4">
          <h2 className="text-xl font-semibold text-rose-600 mb-4">
            🥗 Expenses by Category
          </h2>
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 w-full">
            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height={300} className="lg:w-2/3">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label={({ name, percentage }) => `${name} (${percentage}%)`}
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS1[index % COLORS1.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`৳${value.toFixed(2)}`, name]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#cbd5e1",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#111827",
                  }}
                  labelStyle={{ fontWeight: "bold", color: "#1f2937" }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend / Category Summary */}
            <div className="bg-gray-100 rounded-xl shadow-md p-4 lg:w-1/3 w-full">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                🧾 See Details:
              </h3>
              <ul className="space-y-2">
                {[...categoryData]
                  .sort((a, b) => b.percentage - a.percentage)
                  .map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="inline-block w-4 h-4 rounded-full"
                          style={{
                            backgroundColor: COLORS1[index % COLORS1.length],
                          }}
                        />
                        <span className="text-sm text-gray-800 font-medium">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 font-semibold">
                        {item.percentage}%
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
