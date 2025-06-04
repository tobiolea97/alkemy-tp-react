import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./root";
import Write from "../pages/Write";
import Review from "../pages/Review";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { PrivateRoute } from "./privateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Home /> },
        { path: "home", element: <Home />},
        { path: "write", element: <Write /> },
        { path: "review", element: <Review /> },
        { path: "*", element: <Home /> },
      ],
    },
  ]);

export default router;