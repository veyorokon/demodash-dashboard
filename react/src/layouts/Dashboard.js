import React from "react";
import {Switch, Route} from "react-router-dom";
import routes from "routes.js";

const switchRoutes = (
  <Switch>
    {routes.dashboard.map((prop, key) => {
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

function Dashboard(props) {
  return <>{switchRoutes}</>;
}

export default Dashboard;
