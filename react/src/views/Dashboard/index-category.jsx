import React, {useEffect} from "react";

import {validateToken, clearToken} from "lib";
// import {Home, Demos} from "./Views";
import {Home, Demos} from "./Views";
import {TwoColumn} from "./Components";

import home from "assets/svg/dashboard/home.svg";

//["Overview", "Demos", "Purchases", "Payout", "Settings"]
const headers = [
  {text: "Home", icon: home},
  {text: "Demos", isCategory: true},
  {text: "Products", icon: home, isSub: true}
  // {text: "Demos"},
  // {text: "Purchases"}
];

export default props => {
  useEffect(() => {
    const isTokenValid = validateToken();
    if (!isTokenValid) {
      clearToken();
      return props.history.push("/login");
    }
  });

  return (
    <TwoColumn tabHeaders={headers} selected="Home">
      <Home key={"Home"} />
      <Demos key={"Products"} />
      {/*<Demos />
      <Home />
      <Demos />
      <Home />*/}
    </TwoColumn>
  );
};
