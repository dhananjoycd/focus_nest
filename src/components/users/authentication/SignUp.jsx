/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import PageTransition from "../../../Providers/AnimationProvider/PageTransition";
import SocailSignIn from "./SocailSignIn";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { createUserByAxios } from "../../../hooks/apiByAxios";

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, setLoading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
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

    if (formData.mobile && !/^\d{11,15}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // if exit it return false
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirebaseError(""); // Clear previous Firebase errors

    if (validateForm()) {
      setLoading(true);
      try {
        await createUser(formData.email, formData.password);
        // send Data On Server and also Database
        createUserByAxios(formData);
        alert("You have registered Succesfully!");
        navigate("/money_track");
      } catch (error) {
        setFirebaseError("Check Again! You have entered Invalid Data"); // Set Firebase error message
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <PageTransition>
      <div className="max-w-md mx-auto mt-10 bg-gray-900 border border-amber-300 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block font-medium">Mobile (Optional)</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter mobile number"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile}</p>
            )}
          </div>

          {/* firebase error handle */}
          {firebaseError && (
            <p className="text-center text-red-600 border border-amber-300 p-2">
              {firebaseError}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
      <SocailSignIn></SocailSignIn>
    </PageTransition>
  );
};

export default SignUp;
