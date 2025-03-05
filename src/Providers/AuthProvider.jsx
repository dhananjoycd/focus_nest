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

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  console.log(user?.uid);
  console.log(user?.displayName);
  console.log(user?.email);
  console.log(user?.photoURL);
  console.log(user?.phoneNumber);
  console.log(user?.metadata);
  console.log(user?.emailVerified);

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
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // signOut user
  const signOutUser = () => {
    setLoading(true);
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
