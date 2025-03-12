import { useContext, useEffect } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || "/";

  useEffect(() => {
    if (user) {
      setTimeout(() => {}, 2000); // Hide alert after 2 seconds
    }
  }, [user]);
  return user ? (
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-lg font-semibold text-red-500">⚠️ Warning</h2>
        <p className="text-gray-700 mt-2">You are already signed in!</p>
        <p className="text-sm text-gray-500">Redirecting...</p>
        {setTimeout(() => navigate(from), 2000)}
      </div>
    </div>
  ) : (
    children
  );
};
PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PublicRoute;
