import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// views without layouts
import Index from "views/Index.js";
import Networks from "views/Interactive/Networks.js";
import PlotStats from "views/Interactive/PlotStats.js";
import Wordclouds from "views/Interactive/Wordclouds.js";

import Data from "views/Data/Data.js";
import Analysis from "views/Analysis/Analysis.js";

ReactDOM.render(
  <Router basename="/">
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/plotstats" component={PlotStats} />
      <Route exact path="/networks" component={Networks} />
      <Route exact path="/wordclouds" component={Wordclouds} />
      <Route exact path="/data" component={Data} />
      <Route exact path="/analysis" component={Analysis} />
      <Redirect from="*" to="/"/>
    </Switch>
  </Router>,
  document.getElementById("root")
);
