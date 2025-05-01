import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import PageTransition from "../../Providers/AnimationProvider/PageTransition";
import AuthContext from "../../Providers/AuthContext/AuthContext";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!loading && location.pathname !== "/profile" && !user?.emailVerified) {
      toast.warning("Please verify your email address!", {
        position: "top-center",
        autoClose: 1200,
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
  }, [user, loading, location.pathname]);

  if (loading) {
    return (
      <PageTransition>
        <span className="loading loading-ring loading-lg"></span>
      </PageTransition>
    );
  }

  if (!user) {
    return <Navigate to="/signIn" state={location?.pathname} />;
  }

  // Allow access to the profile page even if email is not verified
  if (user && !user?.emailVerified && location.pathname !== "/profile") {
    return <Navigate to="/profile" state={location?.pathname} />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
