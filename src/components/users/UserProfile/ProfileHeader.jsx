import { useContext, useState } from "react";
import AuthContext from "../../../Providers/AuthContext/AuthContext";
import { BadgeCheck, Briefcase, Camera } from "lucide-react";
import useImageUpload from "../../../hooks/useImageUpload";
import { toast } from "react-toastify";
import Loader from "../../../hooks/Loader";

const ProfileHeader = () => {
  const { user, loading: authLoading } = useContext(AuthContext);

  const { uploadImage, loading } = useImageUpload();
  const [profileImage, setProfileImage] = useState(
    user?.photoURL ||
      "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg"
  );
  const [coverImage, setCoverImage] = useState(
    user?.coverURL ||
      "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1200&q=80"
  );

  const [type, setType] = useState("");

  const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!user?._id) return toast.error("Try again later!");

    setType(type);
    const imageUrl = await uploadImage(file, user?._id, type);
    if (imageUrl) {
      if (type === "photoURL") {
        setProfileImage(imageUrl);
      } else {
        setCoverImage(imageUrl);
      }
    }
  };

  if (authLoading) {
    return <Loader />;
  }

  if (!user?.role) {
    window.location.href = "/profile";
    return null;
  }
  return (
    <div className="relative w-full rounded-t-xl">
      {/* Cover Photo */}

      <div className="w-full h-48 sm:h-60 md:h-72 lg:h-80 relative">
        {loading && type === "coverURL" ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-t-xl">
            <span className="loading loading-spinner text-info"></span>
          </div>
        ) : (
          <div className="relative">
            <img
              src={coverImage}
              alt="Cover"
              className="w-full h-48 sm:h-60 md:h-72 lg:h-80  object-cover rounded-t-xl"
            />
            {/* Hidden file input and label for click */}
            <input
              type="file"
              id="cover-upload"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, "coverURL")}
            />
            <label
              htmlFor="cover-upload"
              className="absolute bottom-4 right-4 bg-white p-2 rounded-full cursor-pointer shadow-lg z-50"
            >
              <Camera className="text-gray-600" />
            </label>
          </div>
        )}
      </div>

      {/* Profile Picture & Info */}
      <div className="relative flex flex-col items-center -mt-16 sm:-mt-20">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg"
          />
          {loading && type === "photoURL" ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-full">
              <span className="loading loading-spinner text-info"></span>
            </div>
          ) : (
            <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer shadow-lg">
              <Camera className="text-gray-600" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "photoURL")}
              />
            </label>
          )}
        </div>

        {/* User Info */}
        <div className="text-center mt-2 sm:mt-4">
          {/* Name with animated gradient and verification */}
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-300%">
              {user?.displayName}
            </h2>
            {user?.emailVerified && (
              <div className="relative group">
                <span className="inline-flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-6 h-6 shadow-md">
                  <BadgeCheck className="w-4 h-4 text-white" />
                </span>
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Verified Account
                </span>
              </div>
            )}
          </div>

          {/* Role Badge with glowing effect */}
          <div className="mt-3 mb-4">
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm ${
                user?.role === "admin"
                  ? "bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-purple-200"
                  : user?.role === "premium"
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-amber-200"
                  : "bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-blue-200"
              }`}
            >
              {user?.role?.toUpperCase() || "MEMBER"}
              {user?.role === "premium" && (
                <span className="ml-1.5 inline-block animate-pulse">✨</span>
              )}
            </span>
          </div>

          {/* Profession with floating card effect */}
          {user?.profession && (
            <div className="flex justify-center mt-3">
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <Briefcase className="w-5 h-5 mr-2 text-indigo-500" />
                <span className="font-medium text-gray-700">
                  {user.profession}
                </span>
              </div>
            </div>
          )}

          {/* Bio with elegant styling */}
          {user?.bio && (
            <div className=" mt-4 px-6 max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-200"></div>
                <div className="relative bg-white/90 p-2 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-relaxed italic">
                    {user.bio}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Financial Summary Cards - Always visible */}
    </div>
  );
};

export default ProfileHeader;
