import { useContext, useState } from "react";
import AuthContext from "../../../Providers/AuthContext/AuthContext";
import { Camera } from "lucide-react";
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
      "https://thumbs.dreamstime.com/b/vast-expanse-water-under-dramatic-grey-sky-reflecting-cloud-cover-above-generative-ai-vast-expanse-water-under-325016587.jpg"
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
        <div className="text-center mt-2">
          <h2 className="text-xl text-black font-semibold">
            {user?.displayName}
          </h2>
          <p className="text-red-600 border my-2 border-amber-400">
            {user?.role || "Refresh Your Browser"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
