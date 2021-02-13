// (C) Daniel Stojanov

import React, {Component} from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Clocks from "./clocks.js";
import SetupPanel from "./settings.js";
import store from "./store.js";

import css from "../css/app.css";

const App = <Provider store={store}>
              <Router>
                <Switch>
                  <Route exact path="/">
                    <Clocks />
                  </Route>
                  <Route exact path="/setup">
                    <SetupPanel />
                  </Route>
                </Switch>
              </Router>
            </Provider>;

export default App;
