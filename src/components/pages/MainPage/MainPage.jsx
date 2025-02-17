import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Header/navbar/Navbar";

const MainPage = () => {
  return (
    <div>
      <nav>
        <Navbar></Navbar>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainPage;
