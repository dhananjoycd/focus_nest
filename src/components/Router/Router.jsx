import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import HomePage from "../pages/HomePage/HomePage";
import MoneyTrack from "../pages/MoneyTrack/MoneyTrack";
import NotFound from "../pages/NotFound/NotFound";
import sidebarLinks from "./moneyRoutes";
import SignIn from "../users/authentication/signin";
import SignUp from "../users/authentication/SignUp";

// Dynamically generate children routes for MoneyTrack
const moneyTrackChildren = sidebarLinks.map((item) => ({
  path: item.url,
  element: item.component,
}));

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/money_track",
        element: <MoneyTrack />,
        children: moneyTrackChildren, // Dynamically generated children
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default Router;
