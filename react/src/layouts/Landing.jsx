import React from "react";
import {Switch, Route} from "react-router-dom";

import routes from "routes.js";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

function Landing() {
  return <>{switchRoutes}</>;
}

export default Landing;
