import { useContext } from "react";
import PageTransition from "../../../Providers/AnimationProvider/PageTransition";
import AuthContext from "../../../Providers/AuthContext/AuthContext";
// import WithOutUser from "./WithOutUser";
// import Loader from "../../../hooks/Loader";
// import MoneyDashboard from "../MoneyTrack/MoneyDashboard";
import HeroSection from "./HeroSection";
import FeaturesDemo from "./FeaturesDemo";
import Screenshots from "./Screenshots";
import WhyChoose from "./WhyChoose";
import Testimonials from "./Testimonials";
import AboutMe from "./AboutMe";

const HomePage = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <PageTransition>
      {/* {loading ? (
        <Loader />
      ) : user ? (
        <MoneyDashboard></MoneyDashboard>
      ) : (
        // <WithOutUser />
        <div>he</div>
      )} */}

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800">
        {/* Hero Section */}
        <HeroSection user={user} />
        <Screenshots /> {/* kon feature a ki Ki ace*/}
        <FeaturesDemo></FeaturesDemo>
        <WhyChoose />
        <Testimonials />
        <AboutMe /> {/* about the owner*/}
      </div>
    </PageTransition>
  );
};

export default HomePage;
