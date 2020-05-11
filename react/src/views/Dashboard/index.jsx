import React, {useEffect} from "react";

import {validateToken, clearToken} from "lib";
import {Overview} from "./Views";

export default props => {
  useEffect(() => {
    const isTokenValid = validateToken();
    if (!isTokenValid) {
      clearToken();
      return props.history.push("/login");
    }
  });

  return (
    <>
      <Overview />
    </>
  );
};
