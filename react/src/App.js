import React from "react";
import ReactDOM from "react-dom";
import {Router, Route} from "react-router-dom";
import {Layout} from "layouts";
import {createBrowserHistory} from "history";
import {ThemeProvider} from "styled-components";
import {Provider} from "react-redux";
import store from "redux/store";
import theme from "theme";
import {client} from "./api";
import {ApolloProvider} from "@apollo/react-hooks";
import smoothscroll from "smoothscroll-polyfill";

const hist = createBrowserHistory();
smoothscroll.polyfill();

const App = () =>
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={hist}>
            <Route path="/" component={Layout} />
          </Router>
        </ThemeProvider>
      </Provider>
    </ApolloProvider>,
    document.getElementById("root")
  );

window.store = store;
window.__forceSmoothScrollPolyfill__ = true;

export default App;
