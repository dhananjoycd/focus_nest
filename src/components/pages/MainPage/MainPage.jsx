import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Header/navbar/Navbar";
import { ToastContainer } from "react-toastify";

const MainPage = () => {
  return (
    <div>
      <ToastContainer />
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
