import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PageTransition from "../../../Providers/AnimationProvider/PageTransition";
import LeftSideBar from "./LeftSideBar";
import { useEffect } from "react";
import sidebarLinks from "../../Router/moneyRoutes";

const MoneyTrack = () => {
  /* ekhane 9-16 line holo by default ekta page dekhanor jonno */
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/money_track") {
      navigate(sidebarLinks[0].url);
    }
  }, [location, navigate]);

  return (
    <PageTransition>
      <div className="grid md:grid-cols-12 gap-3">
        <aside className="left col-span-3">
          <LeftSideBar></LeftSideBar>
        </aside>
        <section className="col-span-9 ms-3 mt-5">
          <Outlet></Outlet>
        </section>
      </div>
    </PageTransition>
  );
};

export default MoneyTrack;
