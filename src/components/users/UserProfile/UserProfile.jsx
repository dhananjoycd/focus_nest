import { useState } from "react";
import PageTransition from "../../../Providers/AnimationProvider/PageTransition";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import EditProfile from "./EditProfile";
import Settings from "./Settings";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto my-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl">
        <ProfileHeader />

        {/* Tab Navigation - Styled as pills */}
        <div className="flex justify-center items-center my-5 gap-5 mb-6">
          {[
            { id: "info", label: "Profile Info", icon: "👤" },
            { id: "edit", label: "Edit Profile", icon: "✏️" },
            { id: "settings", label: "Settings", icon: "⚙️" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2 px-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Render Active Tab */}
        <div className="mt-4">
          {activeTab === "info" && <ProfileInfo />}
          {activeTab === "edit" && <EditProfile />}
          {activeTab === "settings" && <Settings />}
        </div>
      </div>
    </PageTransition>
  );
};

export default UserProfile;
