import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit,} from "react-router-dom";
import HeaderComponent from "../components/ui/header/HeaderComponent";

export default function Root() {
  return (
    <div className="app">
      <HeaderComponent />
      <Outlet />
    </div>
  );
}