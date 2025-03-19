import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const image_hosting_key = import.meta.env.VITE_ImgBB_API_key;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const uploadImage = async (file, userId, type) => {
    if (!file) return null;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      // Upload to ImageBB
      const response = await axios.post(image_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        const imageUrl = response.data.data.url;

        // Update user profile in database

        await axios
          .put(`http://localhost:5000/api/users/${userId}`, {
            [type]: imageUrl,
          })
          .then((response) => {
            toast.success(response.data.message, { position: "top-right" });
          });

        alert(`${type} updated successfully`);
        return imageUrl;
      } else {
        alert(`Failed to update your ${type}`);
        console.error("Upload failed:", response.data);
      }
    } catch (error) {
      toast.warn(`Photo upload failed for ${error}`);
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  return { uploadImage, loading };
};

export default useImageUpload;
