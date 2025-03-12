import { useContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { AuthContext } from "../../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PageTransition from "../../Providers/AnimationProvider/PageTransition";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <PageTransition>
        <span className="loading loading-ring loading-lg"></span>
      </PageTransition>
    );
  }
  return user ? (
    children
  ) : (
    <Navigate to="/signIn" state={location?.pathname}></Navigate>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrivateRoute;
