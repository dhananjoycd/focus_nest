import { createContext, useEffect, useState } from "react";
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
import { createUserByAxios } from "../hooks/apiByAxios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  // google sigIn
  const googleSign = () => {
    setLoading(true);
    return signInWithPopup(auth, new GoogleAuthProvider());
  };
  // Manually user sigIn
  const userSign = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Sign Up form -- Mannually
  const createUser = async (email, password, formData) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user; // Get the new user

      // Wait for state update
      setUser(newUser);

      // Send user data to backend after setting state
      await createUserByAxios(newUser, formData);

      return newUser;
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // signOut user
  const signOutUser = () => {
    return signOut(auth);
  };

  // clean resourse and geting current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // presenting here auth info
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
