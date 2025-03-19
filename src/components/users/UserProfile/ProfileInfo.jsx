import { useContext } from "react";
import AuthContext from "../../../Providers/AuthContext/AuthContext";

const ProfileInfo = () => {
  let { user } = useContext(AuthContext);
  user = {
    name: user?.displayName || "John Doe",
    email: user?.email || "johndoe@example.com",
    bio: user?.bio || "Full Stack Developer",
    location: "Bari Ghar nai",
  };

  return (
    <div className="space-y-2 text-gray-500 shadow p-3">
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Bio:</strong> {user.bio}
      </p>
      <p>
        <strong>Location:</strong> {user.location}
      </p>
    </div>
  );
};

export default ProfileInfo;
