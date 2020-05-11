import React, {useEffect} from "react";
import {Switch, Route} from "react-router-dom";
import {Box} from "components";
import routes from "routes.js";
import {validateToken, clearToken} from "lib";
import {withRouter} from "react-router";

const switchRoutes = (
  <Switch>
    {routes.dashboard.map((prop, key) => {
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

function Dashboard(props) {
  useEffect(() => {
    const isTokenValid = validateToken();
    if (!isTokenValid) {
      clearToken();
      return props.history.push("/login");
    }
  });
  return (
    <>
      <Box h={"5rem"} w="100%" bg="oranges.0" />
      {switchRoutes}
    </>
  );
}

export default withRouter(Dashboard);
