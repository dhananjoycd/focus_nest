import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import HomePage from "../pages/HomePage/HomePage";
import MoneyTrack from "../pages/MoneyTrack/MoneyTrack";
import NotFound from "../pages/NotFound/NotFound";
import UserProfile from "../users/UserProfile/UserProfile";
import SignIn from "../users/authentication/NewUserHandle/SignIn";
import SignUp from "../users/authentication/NewUserHandle/SignUp";
import TimeManagement from "../pages/TimeManagement/TimeManagement";

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
        element: <SignIn />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/money",
        element: <MoneyTrack />,
      },
      {
        path: "/time",
        element: <TimeManagement />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default Router;
