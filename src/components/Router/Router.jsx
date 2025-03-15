import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import HomePage from "../pages/HomePage/HomePage";
import MoneyTrack from "../pages/MoneyTrack/MoneyTrack";
import NotFound from "../pages/NotFound/NotFound";
import sidebarLinks from "./moneyRoutes";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./PublicRoute";
import UserProfile from "../users/UserProfile/UserProfile";
import SignIn from "../users/authentication/NewUserHandle/SignIn";
import SignUp from "../users/authentication/NewUserHandle/SignUp";

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
        element: (
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        ),
      },
      {
        path: "/signUp",
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/money_track",
        element: (
          <PrivateRoute>
            <MoneyTrack />
          </PrivateRoute>
        ),
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
