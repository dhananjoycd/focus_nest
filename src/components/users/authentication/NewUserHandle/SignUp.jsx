/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../../../Providers/AnimationProvider/PageTransition";
import SocailSignIn from "./SocailSignIn";
import AuthContext from "../../../../Providers/AuthContext/AuthContext";
import CommonMsg from "./CommonMsg";

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, sendToServer } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "viewer",
  });

  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.phoneNumber && !/^\d{11,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid phoneNumber number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirebaseError("");

    if (validateForm()) {
      try {
        setLoading(true);
        await createUser(formData.email, formData.password, formData);
        alert("You have registered successfully!");
        navigate("/profile");
      } catch (error) {
        setFirebaseError(
          error.message || "Check Again! You have entered Invalid Data"
        );
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-purple-500/50 hover:border-purple-400 transition-all duration-300">
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-blue-600/90 py-5 px-6">
            <h2 className="text-3xl font-bold text-center text-white">
              Join Us Today
            </h2>
            <p className="text-center text-purple-100/90 mt-1">
              Create your account in seconds
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 ">
            {firebaseError && (
              <div className="mb-6 p-3 bg-red-900/60 border border-red-400/70 rounded-lg text-red-100 text-center animate-pulse">
                {firebaseError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-purple-100/90 mb-1">
                    First Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-all duration-300 -z-10"></div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full bg-gray-700/40 text-white rounded-lg border-2 ${
                        errors.firstName
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-purple-500/30 focus:border-purple-400"
                      } focus:ring-2 focus:ring-purple-400/50 focus:bg-gray-700/60 p-3 pl-10 transition-all duration-200 backdrop-blur-sm`}
                      placeholder="John"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-purple-400/80 group-hover:text-purple-300 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-amber-50">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-purple-100/90 mb-1">
                    Last Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-all duration-300 -z-10"></div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full bg-gray-700/40 text-white rounded-lg border-2 ${
                        errors.lastName
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-purple-500/30 focus:border-purple-400"
                      } focus:ring-2 focus:ring-purple-400/50 focus:bg-gray-700/60 p-3 pl-10 transition-all duration-200 backdrop-blur-sm`}
                      placeholder="Doe"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-purple-400/80 group-hover:text-purple-300 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.lastName && (
                    <p className="mt-1 text-sm  text-amber-50">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-purple-100/90 mb-1">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-all duration-300 -z-10"></div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-gray-700/40 text-white rounded-lg border-2 ${
                      errors.email
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-purple-500/30 focus:border-purple-400"
                    } focus:ring-2 focus:ring-purple-400/50 focus:bg-gray-700/60 p-3 pl-10 transition-all duration-200 backdrop-blur-sm`}
                    placeholder="example@email.com"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-purple-400/80 group-hover:text-purple-300 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm  text-amber-50">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-purple-100/90 mb-1">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-all duration-300 -z-10"></div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full bg-gray-700/40 text-white rounded-lg border-2 ${
                        errors.password
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-purple-500/30 focus:border-purple-400"
                      } focus:ring-2 focus:ring-purple-400/50 focus:bg-gray-700/60 p-3 pl-10 pr-10 transition-all duration-200 backdrop-blur-sm`}
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-purple-400/80 group-hover:text-purple-300 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5 text-purple-400/80 hover:text-purple-300 transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-purple-400/80 hover:text-purple-300 transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm  text-amber-50">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-purple-100/90 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-all duration-300 -z-10"></div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full bg-gray-700/40 text-white rounded-lg border-2 ${
                        errors.confirmPassword
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-purple-500/30 focus:border-purple-400"
                      } focus:ring-2 focus:ring-purple-400/50 focus:bg-gray-700/60 p-3 pl-10 pr-10 transition-all duration-200 backdrop-blur-sm`}
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-purple-400/80 group-hover:text-purple-300 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <svg
                          className="h-5 w-5 text-purple-400/80 hover:text-purple-300 transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-purple-400/80 hover:text-purple-300 transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm  text-amber-50">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-purple-100/90 mb-1">
                  Phone Number (Optional)
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-all duration-300 -z-10"></div>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full bg-gray-700/40 text-white rounded-lg border-2 ${
                      errors.phoneNumber
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-purple-500/30 focus:border-purple-400"
                    } focus:ring-2 focus:ring-purple-400/50 focus:bg-gray-700/60 p-3 pl-10 transition-all duration-200 backdrop-blur-sm`}
                    placeholder="+1234567890"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-purple-400/80 group-hover:text-purple-300 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm  text-amber-50">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600/90 to-blue-500/90 hover:from-purple-700/90 hover:to-blue-600/90 text-white font-bold shadow-lg transform transition-all duration-300 ease-in-out hover:shadow-purple-500/30 ${
                    loading
                      ? "opacity-80 cursor-not-allowed"
                      : "hover:scale-[1.02] active:scale-95"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Creating Account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        ></path>
                      </svg>
                      Sign Up Now
                    </span>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <SocailSignIn />
            </div>

            <div className="mt-8 text-center">
              <CommonMsg />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SignUp;
