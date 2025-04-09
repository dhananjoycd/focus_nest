import { useContext } from "react";
import PageTransition from "../../../Providers/AnimationProvider/PageTransition";
import AuthContext from "../../../Providers/AuthContext/AuthContext";
import WithOutUser from "./WithOutUser";
import Loader from "../../../hooks/Loader";
import MoneyDashboard from "../MoneyTrack/MoneyDashboard";

const HomePage = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <PageTransition>
      {loading ? (
        <Loader />
      ) : user ? (
        <MoneyDashboard></MoneyDashboard>
      ) : (
        <WithOutUser />
      )}
    </PageTransition>
  );
};

export default HomePage;
