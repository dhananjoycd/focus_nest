import { useState } from "react";
import PageTransition from "../../../Providers/AnimationProvider/PageTransition";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import EditProfile from "./EditProfile";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("info");
  return (
    <PageTransition>
      <div className="sm:w-[640px] lg:w-[851px] mx-auto my-3 p-6 bg-[#FFFFFF] dark:bg-gray-300 rounded-xl shadow-lg">
        <ProfileHeader />

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b pb-2 mt-4">
          {["info", "edit"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-2 border-white-500 text-gray-700"
                  : "text-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Render Active Tab */}
        <div className="mt-4">
          {activeTab === "info" && <ProfileInfo />}
          {activeTab === "edit" && <EditProfile />}
        </div>
      </div>
    </PageTransition>
  );
};
export default UserProfile;
