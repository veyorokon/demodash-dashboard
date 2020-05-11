import React from "react";
import {Switch, Route} from "react-router-dom";

import routes from "routes.js";

const switchRoutes = (
  <Switch>
    {routes.auth.map((prop, key) => {
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

function Auth() {
  return <>{switchRoutes}</>;
}

export default Auth;