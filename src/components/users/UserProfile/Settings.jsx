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
    <div className="flex flex-col justify-center items-center text-gray-700 bg-sky-100 dark:bg-gray-100 p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>

      <button className="btn btn-error my-3" onClick={signOutUser}>
        Sign Out
      </button>

      {/* ✅ Verify Email */}
      {!user.emailVerified && (
        <div className="mb-4">
          <button
            onClick={handleVerifyEmail}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            disabled={loading}
          >
            Verify Email
          </button>
        </div>
      )}

      {/* ✅ Change Password */}
      <div className="mb-4">
        <button
          onClick={() => handleChangePassword(auth?.currentUser?.email)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          Reset Password
        </button>
      </div>

      {/* 🚨 Delete Account */}
      {/* ✅ Account Deletion */}
      <div className="mb-4 flex flex-col items-center justify-center">
        <label className="block font-medium mb-1">Enter Password:</label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <button
          onClick={handleDeleteAccount}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          disabled={loading}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
