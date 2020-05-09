/*
    Author: Vahid Eyorokon
*/

/*
    Imports
*/

import Login from "views/Auth/Login";
import Register from "views/Auth/Register";

const routes = [
  {
    path: "/register",
    name: "Register",
    rtlName: "Register",
    icon: null,
    component: Register,
    layout: "/"
  },
  {
    path: "/login",
    name: "Login",
    rtlName: "Login",
    icon: null,
    component: Login,
    layout: "/"
  },
  {
    path: "/",
    name: "Login",
    rtlName: "Login",
    icon: null,
    component: Login,
    layout: "/"
  }
];

export default routes;
