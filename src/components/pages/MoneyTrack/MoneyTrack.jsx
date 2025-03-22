import PageTransition from "../../../Providers/AnimationProvider/PageTransition";
import { useState } from "react";
import CurrentStatus from "./CurrentStatus/CurrentStatus";
import Earnings from "./Earnings/Earnings";
import Expenses from "./Expenses/Expenses";
import { CircleX, ListCollapse } from "lucide-react";

const MoneyTrack = () => {
  const [activeTab, setActiveTab] = useState("earnings");
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
          className={`fixed md:relative dark:bg-gray-700 bg-gray-50 w-3/4 md:w-full md:top-0 md:left-0 md:col-span-3 lg:col-span-2 top-18 left-2 h-full md:h-auto border border-gray-300 rounded-3xl p-3 shadow-lg z-40 transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-160"
          } md:translate-x-0`}
        >
          <h3 className="px-3 py-2 text-center font-bold dark:text-yellow-300">
            At a Glance
          </h3>
          <ul className="flex flex-col gap-1.5">
            {["earnings", "expenses", "details", "status", "learn"].map(
              (tab) => (
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
              )
            )}
          </ul>
        </aside>

        {/* Content Section */}
        <section className="flex-1 md:col-span-9 lg:col-span-10 ms-1 mt-5 shadow p-3 rounded-2xl w-full border border-white">
          {activeTab === "status" && <CurrentStatus />}
          {activeTab === "earnings" && <Earnings />}
          {activeTab === "expenses" && <Expenses />}
        </section>
      </div>
    </PageTransition>
  );
};

export default MoneyTrack;
