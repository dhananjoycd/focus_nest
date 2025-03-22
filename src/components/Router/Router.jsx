import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import HomePage from "../pages/HomePage/HomePage";
import MoneyTrack from "../pages/MoneyTrack/MoneyTrack";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./PublicRoute";
import UserProfile from "../users/UserProfile/UserProfile";
import SignIn from "../users/authentication/NewUserHandle/SignIn";
import SignUp from "../users/authentication/NewUserHandle/SignUp";

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
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default Router;
