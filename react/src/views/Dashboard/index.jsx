import React, {useEffect} from "react";

import {validateToken, clearToken} from "lib";
import {Overview, Demos} from "./Views";
import {TwoColumn} from "./Components";

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
      <TwoColumn tabHeaders={["first", "second"]}>
        <Overview />
        <Demos />
      </TwoColumn>
    </>
  );
};
