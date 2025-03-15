import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../components/users/authentication/firebase/firebase.init";
import { createUserByAxios, fetchUsersByAxios } from "../hooks/apiByAxios";
import AuthContext from "./AuthContext/AuthContext";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [dbUsers, setDbUsers] = useState([]);

  // Google Sign-In
  const googleSign = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const newUser = result.user;

      // Send user data to backend
      await createUserByAxios(
        "http://localhost:5000/api/users/signUp",
        newUser
      );

      // ✅ Update state
      setUser(newUser);

      return newUser;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Manual Sign-In
  const userSign = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign-Up Form -- Manual
  const createUser = async (email, password, formData) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      // Send user data to backend
      await createUserByAxios(
        "http://localhost:5000/api/users/signUp",
        newUser,
        formData
      );

      setUser(newUser); // Set state after successful API call
      return newUser;
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign-Out User
  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("You have signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Fetch Users from Database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await fetchUsersByAxios(
          "http://localhost:5000/api/users"
        );
        setDbUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [user]); // ✅ Runs when `user` state changes

  // Track Auth State & Update User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || !dbUsers.length) {
        setUser(null);
      } else {
        const matchedUser = dbUsers.find((u) => u.uid === currentUser.uid);
        if (matchedUser && matchedUser.uid !== user?.uid) {
          setUser(matchedUser);
        }
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [dbUsers, user?.uid]);

  // Authentication Context Data
  const authInfo = {
    loading,
    setLoading,
    user,
    googleSign,
    createUser,
    userSign,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
