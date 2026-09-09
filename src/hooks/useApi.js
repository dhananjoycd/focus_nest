import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../Providers/AuthContext/AuthContext";

const useApi = (baseUrl) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Read (GET)
  const fetchData = async (endpoint = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/${endpoint}?uid=${user?.uid}`,
        { withCredentials: true }
      );
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create (POST)
  const createData = async (endpoint = "", newData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/${endpoint}`,
        { ...newData, uid: user?.uid },
        { withCredentials: true }
      );
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update (PUT/PATCH)
  const updateData = async (id, data, method = "PUT") => {
    setLoading(true);
    try {
      const url = `${baseUrl}/${id}`;
      const response =
        method === "PATCH"
          ? await axios.patch(url, data, { withCredentials: true })
          : await axios.put(url, data, { withCredentials: true });
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const deleteData = async (endpoint = "", id) => {
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}/${endpoint}/${id}`, {
        withCredentials: true,
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchData,
    createData,
    updateData,
    deleteData,
    user,
  };
};

export default useApi;
