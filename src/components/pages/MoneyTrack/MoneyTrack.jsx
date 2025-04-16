import PageTransition from "../../../Providers/AnimationProvider/PageTransition";
import { useState } from "react";
import Earnings from "./Earnings/Earnings";
import Expenses from "./Expenses/Expenses";
import { CircleX, ListCollapse } from "lucide-react";
import MoneyDashboard from "./MoneyDashboard";

const MoneyTrack = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <PageTransition>
      <div className="flex flex-col md:grid md:grid-cols-12 text-gray-700 p-3 gap-3 m-2 relative">
        {/* Sidebar Toggle Button for Mobile */}
        <button
          className="md:hidden z-50 p-2 bg-amber-700 text-white rounded shadow fixed top-20 left-6"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <CircleX size={24} /> : <ListCollapse size={24} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed md:sticky dark:bg-gray-700 bg-gray-50 w-3/4 md:w-full md:top-10 md:left-0 md:col-span-3 lg:col-span-2 top-18 left-2  h-fit max-h-[90vh]  border border-gray-300 rounded-3xl p-3 shadow-lg z-40 transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-160"
          } md:translate-x-0`}
        >
          <h3 className="px-3 py-2 text-center font-bold dark:text-yellow-300">
            Money is Honey!
          </h3>
          <ul className="flex flex-col gap-1.5">
            {["dashboard", "earnings", "expenses"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsSidebarOpen(false); // Close sidebar when a tab is selected
                }}
                className={`p-2 ms-2 me-2 text-black border shadow bg-amber-50 rounded-lg transition-all 
                  ${
                    activeTab === tab
                      ? "bg-amber-700 text-yellow-50"
                      : "hover:bg-gray-500 hover:text-white"
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </ul>

          {/* upcoming message */}
          <p className="relative text-sm font-bold text-center mt-8 py-4 rounded-xl overflow-hidden">
            {/* Animated background gradient */}
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 animate-gradient-x"></span>

            {/* Text with multiple animations */}
            <span className="relative z-10 inline-block">
              <span className="inline-block animate-bounce">🚀</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 animate-text-gradient">
                Big things are on the way...
              </span>
              <span className="inline-block animate-wiggle">✨</span>
              <br />
              <span className="block md:inline mt-2 md:mt-0 md:ml-2 text-md font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
                Stay tuned for exciting updates!
              </span>
            </span>

            {/* Floating decorative elements */}
            <span className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-purple-400 opacity-70 animate-float"></span>
            <span className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-indigo-400 opacity-70 animate-float-delay"></span>
          </p>
        </aside>

        {/* Content Section */}
        <section className="flex-1 md:col-span-9 lg:col-span-10 ms-1 mt-5 shadow p-3 rounded-2xl w-full border border-white">
          {activeTab === "dashboard" && <MoneyDashboard />}
          {activeTab === "earnings" && <Earnings />}
          {activeTab === "expenses" && <Expenses />}
        </section>
      </div>
    </PageTransition>
  );
};

export default MoneyTrack;
