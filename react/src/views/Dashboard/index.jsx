import React, {useEffect} from "react";

import {validateToken, clearToken} from "lib";
// import {Home, Demos} from "./Views";
import {Home, FindProductDemos} from "./Views";
import {TwoColumn} from "./Components";

import home from "assets/svg/dashboard/home.svg";

//["Overview", "Demos", "Purchases", "Payout", "Settings"]
const headers = [
  {text: "Home", icon: home},
  {text: "Find Product Demos", icon: home},
  {text: "My Product Demos", icon: home},
  {text: "My demodash Store", icon: home},
  {text: "Payout", icon: home},
  {text: "Profile", icon: home}
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
    <TwoColumn tabHeaders={headers} selected={1}>
      <Home key="Home" />
      <FindProductDemos key="FindProductDemos" />
      {/*<Demos />
      <Home />
      <Demos />
      <Home />*/}
    </TwoColumn>
  );
};
