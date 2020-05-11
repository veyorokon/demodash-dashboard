import React, {useEffect} from "react";

import {validateToken, clearToken} from "lib";
import Hero from "./Sections/Hero";

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
      <Hero />
    </>
  );
};
