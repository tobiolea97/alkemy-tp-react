import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./root";
import Products from "../views/products/Products";
import Users from "../views/users/Users";
import Home from "../views/home/Home";
import UserDetail from "../views/users/UserDetail";
import ProductDetails from "../views/products/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "home", element: <Home /> },
      
      { path: "users", element: <Users /> },
      { path: "users/detail/:id", element: <UserDetail /> },
      { path: "users/edit/:id", element: <UserDetail mode="edit" /> },
      { path: "users/new", element: <UserDetail mode="new" /> },
      
      { path: "products", element: <Products /> },
      { path: "products/detail/:id", element: <ProductDetails /> },
      { path: "products/new", element: <ProductDetails mode="new" /> },
      { path: "products/edit/:id", element: <ProductDetails mode="edit" /> },
      
      { path: "*", element: <Home /> },
    ],
  },
]);

export default router;
