import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./root";
import Products from "../views/products/Products";
import Users from "../views/users/Users";
import Home from "../views/home/Home";

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