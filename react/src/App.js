import React from "react";
import ReactDOM from "react-dom";
import {Router, Route} from "react-router-dom";
import Landing from "layouts/Landing.jsx";
import {createBrowserHistory} from "history";
import {ThemeProvider} from "styled-components";
import {Provider} from "react-redux";
import store from "redux/store";

import theme from "theme";

const hist = createBrowserHistory();

const App = () =>
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={hist}>
          <Route path="/" component={Landing} />
        </Router>
      </ThemeProvider>
    </Provider>,
    document.getElementById("root")
  );

window.store = store;
export default App;
