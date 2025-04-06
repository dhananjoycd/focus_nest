import { useContext, useState } from "react";
import AuthContext from "../../../Providers/AuthContext/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "John Doe",
    email: user?.email || "johndoe@example.com",
    bio: user?.bio || "Full Stack Developer",
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

      // Update global user state instantly
      console.log("Current User:", user);

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
    <form className="space-y-4 shadow p-3">
      <input
        type="text"
        name="displayName"
        value={formData.displayName}
        onChange={handleChange}
        className="border p-2 text-gray-600 w-full"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        className="border p-2 text-gray-600 w-full"
        disabled
      />
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        className="border p-2 text-gray-600 w-full"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleUpdateProfile}
      >
        Save
      </button>
    </form>
  );
};

export default EditProfile;
