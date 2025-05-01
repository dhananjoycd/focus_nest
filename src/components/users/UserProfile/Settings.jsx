import {
  Mail,
  AlertTriangle,
  LogOut,
  ShieldCheck,
  Key,
  Trash2,
} from "lucide-react";
import useOperation from "../../../hooks/useOperation";
import auth from "../authentication/firebase/firebase.init";

const Settings = () => {
  const {
    handleChangePassword,
    handleVerifyEmail,
    handleDeleteAccount,
    user,
    password,
    loading,
    setPassword,
    signOutUser,
  } = useOperation();

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-sky-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
        Account Settings
      </h2>

      {/* User Actions Section */}
      <div className="space-y-6">
        {/* Account Security Section */}
        <div className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            Account Security
          </h3>

          <div className="space-y-4">
            {/* Email Verification */}
            {!user?.emailVerified && (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your email is not verified
                </p>
                <button
                  onClick={handleVerifyEmail}
                  className={`bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                  }`}
                  disabled={loading}
                >
                  <Mail className="w-4 h-4" />
                  {loading ? "Sending..." : "Verify Email"}
                </button>
              </div>
            )}

            {/* Password Reset */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Change your account password
              </p>
              <button
                onClick={() => handleChangePassword(auth?.currentUser?.email)}
                className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
                disabled={loading}
              >
                <Key className="w-4 h-4" />
                {loading ? "Processing..." : "Reset Password"}
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone Section */}
        <div className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-sm border border-red-100 dark:border-red-900/50">
          <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </h3>

          <div className="space-y-4">
            {/* Sign Out */}
            <div className="flex flex-col gap-2">
              <button
                onClick={signOutUser}
                className={`bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>

            {/* Account Deletion */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                This action cannot be undone
              </p>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white text-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password to confirm"
              />

              <button
                onClick={handleDeleteAccount}
                className={`bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  loading || !password
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
                disabled={loading || !password}
              >
                <Trash2 className="w-4 h-4" />
                {loading ? "Deleting..." : "Delete Account Permanently"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
