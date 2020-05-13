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

function Layout() {
  return <>{switchRoutes}</>;
}

export default Layout;
