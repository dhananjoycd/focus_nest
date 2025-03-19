import { useContext, useState } from "react";
import AuthContext from "../../../Providers/AuthContext/AuthContext";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.displayName || "John Doe",
    email: user?.email || "johndoe@example.com",
    bio: user?.bio || "Full Stack Developer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="space-y-4 shadow p-3">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 text-gray-600 w-full"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        className="border p-2 text-gray-600 w-full disabled"
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
      >
        Save
      </button>
    </form>
  );
};

export default EditProfile;
