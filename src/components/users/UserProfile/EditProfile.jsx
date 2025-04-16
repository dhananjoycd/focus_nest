import { useContext, useState } from "react";
import AuthContext from "../../../Providers/AuthContext/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "John Doe",
    email: user?.email || "johndoe@example.com",
    bio: user?.bio || "Full Stack Web Developer",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://focus-nest-server.vercel.app/api/users/${user?._id}`,
        formData
      );

      setUser((p) => ({ ...p, ...formData }));

      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      toast.error(
        `Failed to update profile - ${
          error.response?.data?.message || error.message
        }`,
        {
          position: "top-right",
        }
      );
    }
  };

  return (
    <form className="space-y-6 shadow-lg rounded-xl p-6 bg-gradient-to-br from-blue-50 to-purple-50 max-w-md mx-auto">
      <div className="space-y-2">
        <label
          htmlFor="displayName"
          className="block text-sm font-medium text-purple-700"
        >
          Display Name
        </label>
        <input
          type="text"
          id="displayName"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          className="border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg p-3 w-full transition duration-200 text-gray-700 placeholder-purple-300"
          placeholder="Enter your name"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-purple-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          className="border-2 border-gray-200 bg-gray-100 rounded-lg p-3 w-full text-gray-600 cursor-not-allowed"
          disabled
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-purple-700"
        >
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg p-3 w-full h-32 transition duration-200 text-gray-700 placeholder-purple-300"
          placeholder="Tell us about yourself..."
        ></textarea>
      </div>

      <button
        type="submit"
        onClick={handleUpdateProfile}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 transform hover:-translate-y-0.5"
      >
        Save Profile
      </button>
    </form>
  );
};

export default EditProfile;
