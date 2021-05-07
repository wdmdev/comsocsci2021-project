import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// views without layouts
import Index from "views/Index.js";
import Networks from "views/Networks.js";
import PlotStats from "views/PlotStats.js";
import Wordclouds from "views/Wordclouds.js";

import Data from "views/Data/Data.js";
import Analysis from "views/Analysis.js";

ReactDOM.render(
  <BrowserRouter basename={"/comsocsci2021-project"}>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/plotstats" component={PlotStats} />
      <Route exact path="/networks" component={Networks} />
      <Route exact path="/wordclouds" component={Wordclouds} />
      <Route exact path="/data" component={Data} />
      <Route exact path="/analysis" component={Analysis} />
      {/* add redirect for first page */}
      <Redirect from="*" to="index.html" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
