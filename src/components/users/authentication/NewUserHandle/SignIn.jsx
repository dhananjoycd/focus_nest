/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import PageTransition from "../../../../Providers/AnimationProvider/PageTransition";
import SocailSignIn from "./SocailSignIn";
import AuthContext from "../../../../Providers/AuthContext/AuthContext";
import CommonMsg from "./CommonMsg";

const SignIn = () => {
  const { userSign, loading, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  const from = location.state || "/";
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [firebaseError, setFirebaseError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFirebaseError("");

    try {
      await userSign(formData.email, formData.password);
      navigate(from);
    } catch (error) {
      setFirebaseError("Check Again! You have entered Invalid Data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
        {/* Stylish Login Card */}
        <div className="w-full max-w-md bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white rounded-3xl p-8 shadow-[0_0_60px_#f59e0b40] border border-white/10 backdrop-blur-md space-y-6 animate-fade-in-up transition-all duration-300 hover:scale-[1.02]">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold drop-shadow-lg">Welcome Back</h2>
            <p className="text-sm text-white/90 mt-1">
              Login to access your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/70 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/70 focus:border-transparent transition duration-300"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-10 bg-white/10 text-white placeholder-white/70 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/70 focus:border-transparent transition duration-300"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-white/80 hover:text-white transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={20} strokeWidth={1.5} />
                  ) : (
                    <Eye size={20} strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {firebaseError && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-100 text-sm text-center animate-shake">
                {firebaseError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                loading
                  ? "bg-white/50 text-gray-800 cursor-not-allowed"
                  : "bg-white text-gray-900 hover:bg-white/90 hover:shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Optional Msg */}
          <CommonMsg type="signIn" email={formData.email} />

          {/* Social Sign In */}
          <SocailSignIn />
        </div>
      </div>
    </PageTransition>
  );
};

export default SignIn;
