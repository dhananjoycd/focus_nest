import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
    children: [
      {
        path: "/",
        element: <div>Home Page</div>,
      },
      {
        path: "/money_track",
        element: (
          <div>
            Money Track is the better choice. It sounds more natural,
            professional, and user-friendly. It clearly conveys the idea of
            tracking money, making it more intuitive for users. 🚀
          </div>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <p>error 404</p>,
  },
]);

export default Router;
