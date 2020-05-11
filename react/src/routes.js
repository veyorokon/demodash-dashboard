/*
    Author: Vahid Eyorokon
*/

/*
    Imports
*/

import Login from "views/Auth/Login";
import Register from "views/Auth/Register";
import Dashboard from "views/Dashboard";

const routes = {
  auth: [
    {
      path: "/register",
      name: "Register",
      rtlName: "Register",
      icon: null,
      component: Register
    },
    {
      path: "/",
      name: "Login",
      rtlName: "Login",
      icon: null,
      component: Login
    }
  ],
  dashboard: [
    {
      path: "/dashboard",
      name: "Dashboard",
      rtlName: "Dashboard",
      icon: null,
      component: Dashboard
    },
    {
      path: "/",
      name: "Login",
      rtlName: "Login",
      icon: null,
      component: Login
    }
  ]
};

export default routes;
