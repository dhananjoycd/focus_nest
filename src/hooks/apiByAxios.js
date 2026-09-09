import axios from "axios";

const API_BASE_URL = "https://focus-nest-server.vercel.app/api/users"; // Backend API URL

// Fetch all users
export const fetchUsersByAxios = async (url) => {
  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    return response.data;
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    // console.error("Error fetching users:", error);
  }
};

// Create a new user
export const createUserByAxios = async (url, user, formData) => {
  if (!user) return;
  const userData = {
    uid: user?.uid,
    displayName:
      user?.displayName || `${formData?.firstName} ${formData?.lastName}`,
    email: user?.email,
    password: user?.password,
    role: "viewer",
    photoURL: user?.photoURL || null,
    phoneNumber: user?.phoneNumber || formData?.phoneNumber,
    emailVerified: user?.emailVerified || false,
  };

  try {
    const response = await axios.post(url, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

// Update a user
export const updateUserByAxios = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${userId}`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

// Delete a user
export const deleteUserByAxios = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
