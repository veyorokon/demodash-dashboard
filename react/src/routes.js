/*
    Author: Vahid Eyorokon
*/

/*
    Imports
*/

import Login from "views/Auth/Login";
import Register from "views/Auth/Register";
import Dashboard from "views/Dashboard";

const routes = [
  {
    path: "/register",
    name: "Register",
    rtlName: "Register",
    icon: null,
    component: Register,
    layout: ""
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "Dashboard",
    icon: null,
    component: Dashboard,
    layout: "dashboard"
  },
  {
    path: "/",
    name: "Login",
    rtlName: "Login",
    icon: null,
    component: Login,
    layout: ""
  }
];

export default routes;
