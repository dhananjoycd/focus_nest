import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/users"; // Backend API URL

// Fetch all users
export const fetchUsersByAxios = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Create a new user
export const createUserByAxios = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/signUp",
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

// Update a user
export const updateUserByAxios = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

// Delete a user
export const deleteUserByAxios = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
