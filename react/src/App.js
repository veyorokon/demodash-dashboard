import React from "react";
import ReactDOM from "react-dom";
import {Router, Route} from "react-router-dom";
import {Auth, Dashboard} from "layouts";
import {createBrowserHistory} from "history";
import {ThemeProvider} from "styled-components";
import {Provider} from "react-redux";
import store from "redux/store";
import theme from "theme";
import {client} from "./api";
import {ApolloProvider} from "@apollo/react-hooks";

const hist = createBrowserHistory();

const App = () =>
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={hist}>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/" component={Auth} />
          </Router>
        </ThemeProvider>
      </Provider>
    </ApolloProvider>,
    document.getElementById("root")
  );

window.store = store;
export default App;
