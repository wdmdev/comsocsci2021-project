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
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path="/comsocsci2021-project" exact component={Index} />
      <Route path="/plotstats" exact component={PlotStats} />
      <Route path="/networks" exact component={Networks} />
      <Route path="/wordclouds" exact component={Wordclouds} />
      <Route path="/data" exact component={Data} />
      <Route path="/analysis" exact component={Analysis} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/comsocsci2021-project" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
