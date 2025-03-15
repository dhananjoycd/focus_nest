import { useContext, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Navigate, useLocation } from "react-router-dom";
import PageTransition from "../../Providers/AnimationProvider/PageTransition";
import AuthContext from "../../Providers/AuthContext/AuthContext";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!user?.emailVerified && location.pathname !== "/profile") {
      toast.warning("Please verify your email to access this page.", {
        position: "top-center",
        autoClose: 2500, // Message disappears after 4 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "#c82333",
          color: "white",
          fontWeight: "bold",
          borderRadius: "8px",
        },
        progressStyle: { background: "#c82333" },
      });
    }
  }, [location.pathname, user?.emailVerified]);

  if (loading) {
    return (
      <PageTransition>
        <span className="loading loading-ring loading-lg"></span>
      </PageTransition>
    );
  }

  if (!user) {
    return <Navigate to="/signIn" state={location?.pathname}></Navigate>;
  }

  // Allow access to the profile page even if email is not verified
  if (!user.emailVerified && location.pathname !== "/profile") {
    return <Navigate to="/profile" state={location?.pathname}></Navigate>;
  }
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrivateRoute;
