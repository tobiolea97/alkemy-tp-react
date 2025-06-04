import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./root";
import Products from "../views/Products";
import Users from "../views/Users";
import Home from "../views/Home";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Home /> },
        { path: "home", element: <Home />},
        { path: "products", element: <Products /> },
        { path: "users", element: <Users /> },
        { path: "*", element: <Home /> },
      ],
    },
  ]);

export default router;