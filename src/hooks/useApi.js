import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../Providers/AuthContext/AuthContext";

const useApi = (baseUrl) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Read (GET Request)
  const fetchData = async (endpoint = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/${endpoint}?uid=${user?.uid}`
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

  // Create (POST Request)
  const createData = async (endpoint = "", newData) => {
    setLoading(true);
    try {
      console.log(`${baseUrl}/${endpoint}`);
      const response = await axios.post(`${baseUrl}/${endpoint}`, {
        ...newData,
        uid: user?.uid,
      });
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update (PUT/PATCH Request)
  const updateData = async (endpoint = "", id, updatedData, method = "PUT") => {
    setLoading(true);
    try {
      const url = `${baseUrl}/${endpoint}/${id}`;
      // eslint-disable-next-line no-unused-vars
      const response =
        method === "PATCH"
          ? await axios.patch(url, updatedData)
          : await axios.put(url, updatedData);

      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Delete (DELETE Request)
  const deleteData = async (endpoint = "", id) => {
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}/${endpoint}/${id}`);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
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
