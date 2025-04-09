/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageTransition from "../../../../Providers/AnimationProvider/PageTransition";
import SocailSignIn from "./SocailSignIn";
import AuthContext from "../../../../Providers/AuthContext/AuthContext";
import CommonMsg from "./CommonMsg";

const SignIn = () => {
  const { userSign, loading, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [firebaseError, setFirebaseError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFirebaseError(""); // Clear previous errors

    try {
      await userSign(formData.email, formData.password);
      navigate(from || "/profile");
    } catch (error) {
      setFirebaseError("Check Again! You have entered Invalid Data"); // ✅ Extract error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-md mx-auto mt-10 bg-gray-900 border border-amber-300 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="example@email.com"
              autoComplete="email" // ✅ Fix autocomplete warning
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="••••••••"
              autoComplete="current-password" // ✅ Fix autocomplete warning
            />
          </div>

          {/* Display Firebase Error */}
          {firebaseError && (
            <p className="text-red-500 text-sm text-center">{firebaseError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Signing..." : "Sign In"}
          </button>
        </form>

        <CommonMsg type={"signIn"} email={formData.email}></CommonMsg>
      </div>
      <SocailSignIn />
    </PageTransition>
  );
};

export default SignIn;
