import { createContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const authInfo = {
    demo: "Nai",
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
